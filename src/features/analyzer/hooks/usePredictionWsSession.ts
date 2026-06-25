import { buildAnalyzerWsUrl } from "@/api/wsConfig";
import type { RootStateType } from "@/app/store";
import {
  ImageStatus,
  type IImageData,
  type IPrediction,
} from "@/shared/types/image";
import { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";

type WsProgress = {
  stage?: string;
  model?: string;
  progress?: string;
  count?: number;
};

type WsMessage =
  | {
      type: "ready";
      genus: string;
      models: string[];
      models_count: number;
      chunk_size: number;
      max_images: number;
    }
  | {
      type: "received";
      image_id: string;
      index: number;
      size_bytes: number;
    }
  | {
      type: "rejected";
      image_id: string;
      index: number;
      reason: string;
    }
  | {
      type: "batch_start";
      count: number;
    }
  | {
      type: "batch_progress";
      stage: string;
      model?: string;
      progress?: string;
    }
  | {
      type: "results";
      model: string;
      data: {
        image_id: string;
        probabilities: Record<string, number | string>;
      }[];
    }
  | {
      type: "complete";
      total_received: number;
      processed: number;
      failed: number;
    }
  | {
      type: "error";
      message: string;
    };

function probabilitiesToPredictions(
  probabilities: Record<string, number | string>,
): IPrediction[] {
  return Object.entries(probabilities)
    .filter((entry): entry is [string, number] => typeof entry[1] === "number")
    .map(([classifier, probability]) => ({
      classifier,
      probability,
    }));
}

function updateImageByKey(
  images: IImageData[],
  key: string,
  patch: Partial<IImageData>,
): IImageData[] {
  return images.map((image) =>
    image.key === key ? { ...image, ...patch } : image,
  );
}

async function waitForSocketBuffer(ws: WebSocket): Promise<void> {
  const maxBufferedBytes = 32 * 1024 * 1024;

  while (ws.bufferedAmount > maxBufferedBytes) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

export function usePredictionWsSession(
  getFile: (key: string) => File | undefined,
) {
  const token = useSelector((state: RootStateType) => state.auth.token);
  const socketRef = useRef<WebSocket | null>(null);

  const [progress, setProgress] = useState<WsProgress>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const closeSession = useCallback(() => {
    socketRef.current?.close(1000, "Client closed session");
    socketRef.current = null;
    setIsProcessing(false);
  }, []);

  const processImagesWs = useCallback(
    async (images: IImageData[], genusId: string): Promise<IImageData[]> => {
      if (!token) {
        return images.map((image) => ({
          ...image,
          status: ImageStatus.ERROR,
        }));
      }

      return new Promise<IImageData[]>((resolve) => {
        const url = buildAnalyzerWsUrl(genusId, token);
        const ws = new WebSocket(url);

        socketRef.current = ws;
        setIsProcessing(true);
        setProgress({ stage: "connecting" });

        const sentKeysByServerIndex: string[] = [];
        const imageIdToLocalKey = new Map<string, string>();

        let latestImages: IImageData[] = images.map((image) => ({
          ...image,
          status: ImageStatus.PROCESSING,
        }));

        let finished = false;

        const finish = (fallbackStatus?: typeof ImageStatus.ERROR) => {
          if (finished) return;
          finished = true;

          socketRef.current = null;
          setIsProcessing(false);

          const finalized = latestImages.map((image) => {
            if (image.status !== ImageStatus.PROCESSING) return image;

            if (image.predictions && image.predictions.length > 0) {
              return { ...image, status: ImageStatus.PROCESSED };
            }

            return {
              ...image,
              status: fallbackStatus ?? ImageStatus.ERROR,
            };
          });

          resolve(finalized);
        };

        ws.onopen = async () => {
          setProgress({ stage: "sending", progress: `0/${images.length}` });

          for (let i = 0; i < images.length; i += 1) {
            const image = images[i];
            const file = getFile(image.key);

            if (!file) {
              latestImages = updateImageByKey(latestImages, image.key, {
                status: ImageStatus.ERROR,
              });
              continue;
            }

            const serverIndex = sentKeysByServerIndex.length;
            sentKeysByServerIndex[serverIndex] = image.key;

            ws.send(file);

            setProgress({
              stage: "sending",
              progress: `${i + 1}/${images.length}`,
            });

            await waitForSocketBuffer(ws);
          }

          ws.send(JSON.stringify({ type: "done" }));
        };

        ws.onmessage = (event) => {
          let message: WsMessage;

          try {
            message = JSON.parse(event.data) as WsMessage;
          } catch {
            return;
          }

          switch (message.type) {
            case "ready": {
              setProgress({
                stage: "ready",
                progress: `${message.models_count} models`,
              });
              break;
            }

            case "received": {
              const localKey = sentKeysByServerIndex[message.index];

              if (localKey) {
                imageIdToLocalKey.set(message.image_id, localKey);
              }

              break;
            }

            case "rejected": {
              const localKey = sentKeysByServerIndex[message.index];

              if (localKey) {
                latestImages = updateImageByKey(latestImages, localKey, {
                  status: ImageStatus.ERROR,
                });
              }

              break;
            }

            case "batch_start": {
              setProgress({
                stage: "batch_start",
                count: message.count,
              });
              break;
            }

            case "batch_progress": {
              setProgress({
                stage: message.stage,
                model: message.model,
                progress: message.progress,
              });
              break;
            }

            case "results": {
              for (const result of message.data) {
                const localKey = imageIdToLocalKey.get(result.image_id);
                if (!localKey) continue;

                const predictions = probabilitiesToPredictions(
                  result.probabilities,
                );

                latestImages = updateImageByKey(latestImages, localKey, {
                  predictions,
                  status: predictions.length
                    ? ImageStatus.PROCESSED
                    : ImageStatus.ERROR,
                });
              }

              setProgress({
                stage: "results",
                model: message.model,
              });

              break;
            }

            case "complete": {
              setProgress({
                stage: "complete",
                progress: `${message.processed} processed, ${message.failed} failed`,
              });

              finish();
              break;
            }

            case "error": {
              console.error(message.message);
              finish(ImageStatus.ERROR);
              break;
            }
          }
        };

        ws.onerror = () => {
          finish(ImageStatus.ERROR);
        };

        ws.onclose = (event) => {
          if (!finished) {
            finish(event.wasClean ? undefined : ImageStatus.ERROR);
          }
        };
      });
    },
    [getFile, token],
  );

  return {
    processImagesWs,
    closeSession,
    progress,
    isProcessing,
  };
}

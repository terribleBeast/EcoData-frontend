import { useUpdatePredictionMutation } from "@/api/endpoints";
import { ImageStatus, type IImageData } from "@/shared/types/image";
import { useCallback } from "react";

export const useImagesProcessing = (
  getFile: (key: string) => File | undefined,
) => {
  const [getPrediction] = useUpdatePredictionMutation();

  const processImages = useCallback(
    async (images: IImageData[], genus_id: string) => {
      const results = await Promise.all(
        images
          .filter((image) => image.status === ImageStatus.UPLOADED)
          .map(async (image) => {
            try {
              const file = getFile(image.key);

              if (!file) {
                return {
                  ...image,
                  status: ImageStatus.ERROR,
                } as IImageData;
              }
              const predictions = await getPrediction({
                file,
                genus_id,
              }).unwrap();
              return {
                ...image,
                predictions,
                status: ImageStatus.PROCESSED,
              } as IImageData;
            } catch (e) {
              console.log(e);
              return {
                ...image,
                status: ImageStatus.ERROR,
              } as IImageData;
            }
          }),
      );
      return results;
    },
    [getPrediction, getFile],
  );

  return { processImages };
};

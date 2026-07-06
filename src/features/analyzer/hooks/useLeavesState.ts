import { useCallback, useState } from "react";
import type { IImageData, IPrediction } from "@/shared/types/image";
import { ImageStatus } from "@/shared/types/image";
import type { ILeafData } from "../components/LeavesContainer";

function getBestPrediction(
  predictions: IPrediction[],
): IPrediction | undefined {
  if (predictions.length === 0) return undefined;

  return predictions.reduce((best, current) =>
    current.probability > best.probability ? current : best,
  );
}

export const useLeavesState = () => {
  const [leaves, setLeaves] = useState<ILeafData[]>([]);

  const addLeavesFromImages = useCallback((processedImages: IImageData[]) => {
    setLeaves((prevLeaves) => {
      const leavesByImageKey = new Map(
        prevLeaves.map((leaf) => [leaf.image_key, leaf]),
      );

      for (const image of processedImages) {
        if (image.status !== ImageStatus.PROCESSED) continue;
        if (!image.predictions || image.predictions.length === 0) continue;

        const bestPrediction = getBestPrediction(image.predictions);
        const existingLeaf = leavesByImageKey.get(image.key);

        leavesByImageKey.set(image.key, {
          leaf_id: existingLeaf?.leaf_id ?? crypto.randomUUID(),
          image_key: image.key,
          image,
          predictions: image.predictions,
          bestPrediction,
          leaf_index: 0,
        });
      }

      return Array.from(leavesByImageKey.values());
    });
  }, []);

  const handleDeleteLeaves = useCallback((leaf_id: string) => {
    setLeaves((prevLeaves) =>
      prevLeaves.filter((leaf) => leaf.leaf_id !== leaf_id),
    );
  }, []);

  return {
    leaves,
    addLeavesFromImages,
    handleDeleteLeaves,
  };
};

import { useUpdatePredictionMutation } from "@/api/endpoints";
import { ImageStatus, type IImageData } from "@/shared/types/image";
import { useCallback } from "react";

export const useImagesProcessing = () => {
  const [getPrediction] = useUpdatePredictionMutation();
  const processImages = useCallback(
    async (images: IImageData[]) => {
      const results = await Promise.all(
        images
          .filter((image) => image.status === ImageStatus.UPLOADED)
          .map(async (image) => {
            try {
              const predictions = await getPrediction(image).unwrap();
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
    [getPrediction],
  );

  return { processImages };
};

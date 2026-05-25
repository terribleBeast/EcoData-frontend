import { getMockImages } from "@/test/mock_data";
import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
} from "@/shared/types/image";
import { useCallback, useState } from "react";

export const useImageState = () => {
  const [images, setImages] = useState<IImageData[]>(
    getMockImages(ImageStatus.LOADING, 10),
  );

  const addImages = useCallback((images: IImageData[]) => {
    setImages((prev) => [...images, ...prev]);
  }, []);

  const updateImageStatus = useCallback(
    (image: IImageData, newStatus: ImageStatusType) => {
      setImages((prev) =>
        prev.map((prevImage) =>
          prevImage.key === image.key
            ? { ...image, status: newStatus }
            : prevImage,
        ),
      );
    },
    [],
  );

  const deleteImage = useCallback((image: IImageData) => {
    setImages((prev) =>
      prev.filter((prevImage) => prevImage.key !== image.key),
    );
  }, []);

  const replaceImages = useCallback((images: IImageData[]) => {
    setImages(images);
  }, []);

  return {
    images,
    setImages,
    addImages,
    updateImageStatus,
    deleteImage,
    replaceImages,
  };
};

import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
  type IPrediction,
} from "@/shared/types/image";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImages as addImagesAction,
  deleteImage as deleteImageAction,
  selectGenus,
  selectImages,
  updateImages,
} from "../analyzerSlice";

export const useImageState = () => {
  const images = useSelector(selectImages);
  const selectedGenus = useSelector(selectGenus);
  const dispatch = useDispatch();

  const filesRef = useRef<Map<string, File>>(new Map());

  const addImages = useCallback(
    (files: File[]) => {
      if (!selectedGenus || files.length === 0) return;

      const newImages: IImageData[] = files.map((file) => {
        const key = crypto.randomUUID();
        const src = URL.createObjectURL(file);

        filesRef.current.set(key, file);

        return {
          id: key,
          key,
          name: file.name,
          size: file.size,
          src,
          previewUrl: src,
          status: ImageStatus.UPLOADED,
          predictions: [] as IPrediction[],
          classifier: undefined,
        };
      });

      dispatch(addImagesAction(newImages));
    },
    [dispatch, selectedGenus],
  );

  const updateImageStatus = useCallback(
    (image: IImageData, newStatus: ImageStatusType) => {
      dispatch(
        updateImages(
          images.map((prevImage) =>
            prevImage.key === image.key
              ? { ...prevImage, status: newStatus }
              : prevImage,
          ),
        ),
      );
    },
    [images, dispatch],
  );

  const deleteImage = useCallback(
    (image: IImageData) => {
      filesRef.current.delete(image.key);

      if (image.src) {
        URL.revokeObjectURL(image.src);
      }

      dispatch(deleteImageAction(image.key));
    },
    [dispatch],
  );

  const replaceImages = useCallback(
    (newImages: IImageData[]) => {
      dispatch(updateImages(newImages));
    },
    [dispatch],
  );

  const getImageFile = useCallback((key: string) => {
    return filesRef.current.get(key);
  }, []);

  return {
    getImageFile,
    addImages,
    updateImageStatus,
    deleteImage,
    replaceImages,
  };
};

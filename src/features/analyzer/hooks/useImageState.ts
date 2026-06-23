import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
} from "@/shared/types/image";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenus, selectImages, updateImages } from "../analyzerSlice";

export const useImageState = () => {
  const images = useSelector(selectImages);
  const selectedGenus = useSelector(selectGenus);
  const dispatch = useDispatch();
  const filesRef = useRef<Record<string, File>>({});

  const addImages = useCallback(
    (files: File[]) => {
      if (selectedGenus) {
        const newImages: IImageData[] = files.map((file) => {
          const key = `file-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

          filesRef.current[key] = file;
          return {
            id: Math.random(),
            src: file.type.startsWith("image/")
              ? URL.createObjectURL(file)
              : undefined,
            name: file.name,
            key,
            predictions: undefined,
            status: ImageStatus.UPLOADED,
            classifier: selectedGenus.id,
          };
        });
        dispatch(updateImages(images.concat(newImages)));
      }
    },
    [dispatch, selectedGenus, images],
  );

  const updateImageStatus = useCallback(
    (image: IImageData, newStatus: ImageStatusType) => {
      console.log(image.name);

      dispatch(
        updateImages(
          images.map((prevImage) =>
            prevImage.key === image.key
              ? { ...image, status: newStatus }
              : prevImage,
          ),
        ),
      );
    },
    [images, dispatch],
  );

  const deleteImage = useCallback(
    (image: IImageData) => {
      delete filesRef.current[image.key];
      dispatch(
        updateImages(images.filter((prevImage) => prevImage.key !== image.key)),
      );
    },
    [images, dispatch],
  );

  const replaceImages = useCallback(
    (images: IImageData[]) => {
      dispatch(updateImages(images));
    },
    [dispatch],
  );
  const getFile = useCallback((key: string) => filesRef.current[key], []);

  return {
    getFile,
    updateImages,
    addImages,
    updateImageStatus,
    deleteImage,
    replaceImages,
  };
};

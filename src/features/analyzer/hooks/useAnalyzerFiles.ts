import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { addImages, deleteImage } from "../analyzerSlice";
import {
  ImageStatus,
  type IImageData,
  type IPrediction,
} from "@/shared/types/image";

export function useAnalyzerFiles() {
  const dispatch = useDispatch();
  const filesRef = useRef<Map<string, File>>(new Map());

  const addFiles = useCallback(
    (files: File[]) => {
      const images: IImageData[] = files.map((file) => {
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

      dispatch(addImages(images));
    },
    [dispatch],
  );

  const getFile = useCallback((key: string) => {
    return filesRef.current.get(key);
  }, []);

  const removeFile = useCallback(
    (image: IImageData) => {
      filesRef.current.delete(image.key);

      if (image.src) {
        URL.revokeObjectURL(image.src);
      }

      dispatch(deleteImage(image.key));
    },
    [dispatch],
  );

  return {
    addFiles,
    getFile,
    removeFile,
  };
}

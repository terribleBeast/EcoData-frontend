import { useState, useCallback } from "react";
import type { IImageData } from "../../../shared/types/image";
import { ImageStatus } from "../../../shared/types/image";
import { useImageState } from "./useImageState";
import { useImagesProcessing } from "./useImagesProcessing";
import { useSelector } from "react-redux";
import { selectGenus, selectImages } from "../analyzerSlice";

export function useAnalyzerPage() {
  const [selectedImage, setSelectedImage] = useState<IImageData | null>(null);
  const selectedGenus = useSelector(selectGenus);
  const images = useSelector(selectImages);
  const { getFile, addImages, deleteImage, updateImageStatus, replaceImages } =
    useImageState();

  const { processImages } = useImagesProcessing(getFile);

  // const handleSelectClassifier = useCallback((index: number) => {
  //   setSelectedClassifier(classifiers[index].plant);
  // }, []);

  const openImageFullInfo = useCallback((image: IImageData) => {
    setSelectedImage(image);
  }, []);

  const closeImageFullInfo = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleProcessImages = useCallback(async () => {
    if (selectedGenus?.id === undefined) return;
    // Mark all uploaded images as PROCESSING immediately

    for (const image of images) {
      if (image.status === ImageStatus.UPLOADED) {
        updateImageStatus(image, ImageStatus.PROCESSING);
      }
    }

    // Filter to images that need processing (UPLOADED at time of click)
    const toProcess = images.filter(
      (img) => img.status === ImageStatus.UPLOADED,
    );

    if (toProcess.length === 0) return;

    // 1) Mark as PROCESSING — single bulk dispatch
    const toProcessKeys = new Set(toProcess.map((img) => img.key));
    const markedProcessing = images.map((img) =>
      toProcessKeys.has(img.key)
        ? { ...img, status: ImageStatus.PROCESSING }
        : img,
    );
    replaceImages(markedProcessing);
    // 2) Run predictions
    const processed = await processImages(toProcess, selectedGenus?.id);

    // 3) Merge results back — single bulk dispatch
    const resultByKey = new Map(processed.map((r) => [r.key, r]));
    const merged = markedProcessing.map(
      (img) => resultByKey.get(img.key) ?? img,
    );
    replaceImages(merged);
  }, [images, processImages, updateImageStatus, selectedGenus, replaceImages]);

  return {
    selectedImage,
    addImages,
    deleteImage,
    updateImageStatus,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
  };
}

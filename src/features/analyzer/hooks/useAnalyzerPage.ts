import { useState, useCallback } from "react";
import type { IImageData } from "../../../shared/types/image";
import { classifiers } from "../../../shared/types/classifier";
import { useImageState } from "./useImageState";
import { useImagesProcessing } from "./useImagesProcessing";

export function useAnalyzerPage() {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IImageData | null>(null);
  const [selectedClassifier, setSelectedClassifier] = useState(
    classifiers[0].plant,
  );

  const { images, addImages, deleteImage, updateImageStatus, replaceImages } =
    useImageState();

  const { processImages } = useImagesProcessing();

  const handleSelectClassifier = useCallback((index: number) => {
    setSelectedClassifier(classifiers[index].plant);
  }, []);

  const toggleFileMenu = useCallback(() => {
    setIsFileMenuOpen((prev) => !prev);
  }, []);

  const openImageFullInfo = useCallback((image: IImageData) => {
    setSelectedImage(image);
  }, []);

  const closeImageFullInfo = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleProcessImages = useCallback(async () => {
    const updated = await processImages(images);
    replaceImages(updated);
  }, [images, processImages, replaceImages]);

  return {
    images,
    isFileMenuOpen,
    selectedImage,
    selectedClassifier,
    addImages,
    deleteImage,
    updateImageStatus,
    handleSelectClassifier,
    toggleFileMenu,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
  };
}

import { useState, useCallback } from "react";
import type { IImageData } from "../../../shared/types/image";
import { ImageStatus } from "../../../shared/types/image";
import { useImageState } from "./useImageState";
import { usePredictionWsSession } from "./usePredictionWsSession";
import { useDispatch, useSelector } from "react-redux";
import {
  markImagesProcessing,
  replaceProcessedImages,
  selectGenus,
  selectImages,
} from "../analyzerSlice";
import { useLeavesState } from "./useLeavesState";
import { useAnalyzerFiles } from "./useAnalyzerFiles";

export function useAnalyzerPage() {
  const { handleAddLeaves, handleDeleteLeaves, leaves } = useLeavesState();

  const [selectedImage, setSelectedImage] = useState<IImageData | null>(null);
  const selectedGenus = useSelector(selectGenus);
  const images = useSelector(selectImages);
  const leavesImage = new Map();
  const {
    getImageFile,
    addImages,
    deleteImage,
    updateImageStatus,
    replaceImages,
  } = useImageState();

  // const handleSelectClassifier = useCallback((index: number) => {
  //   setSelectedClassifier(classifiers[index].plant);
  // }, []);

  const openImageFullInfo = useCallback((image: IImageData) => {
    setSelectedImage(image);
  }, []);

  const closeImageFullInfo = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // const handleProcessImages = useCallback(async () => {
  //   if (selectedGenus?.id === undefined) return;

  //   const toProcess = images.filter(
  //     (img) => img.status === ImageStatus.UPLOADED,
  //   );

  //   if (toProcess.length === 0) return;

  //   const toProcessKeys = new Set(toProcess.map((img) => img.key));

  //   const markedProcessing = images.map((img) =>
  //     toProcessKeys.has(img.key)
  //       ? { ...img, status: ImageStatus.PROCESSING }
  //       : img,
  //   );

  //   replaceImages(markedProcessing);

  //   const processed = await processImagesWs(toProcess, selectedGenus.id);

  //   const resultByKey = new Map(
  //     processed.map((result) => [result.key, result]),
  //   );

  //   const merged = markedProcessing.map(
  //     (img) => resultByKey.get(img.key) ?? img,
  //   );

  //   replaceImages(merged);
  // }, [images, selectedGenus, replaceImages, processImagesWs]);

  const dispatch = useDispatch();

  // const images = useSelector(selectAnalyzerImages);
  // const selectedGenus = useSelector(selectSelectedGenus);

  const { addFiles, getFile, deleteFile } = useAnalyzerFiles();

  const { processImagesWs, closeSession, progress, isProcessing } =
    usePredictionWsSession(getFile);

  const selectedGenusId = selectedGenus?.id;

  const handleProcessImages = useCallback(async () => {
    if (!selectedGenusId) return;

    const toProcess = images.filter(
      (img) => img.status === ImageStatus.UPLOADED,
    );

    if (toProcess.length === 0) return;

    dispatch(markImagesProcessing(toProcess.map((image) => image.key)));

    const processed = await processImagesWs(toProcess, selectedGenusId);

    dispatch(replaceProcessedImages(processed));
  }, [dispatch, images, selectedGenusId, processImagesWs]);
  return {
    selectedImage,
    addImages,
    deleteImage,
    updateImageStatus,
    openImageFullInfo,
    closeImageFullInfo,
    handleProcessImages,
    progress,
    isProcessing,
    handleAddLeaves,
    handleDeleteLeaves,
    leavesImage,
  };
}

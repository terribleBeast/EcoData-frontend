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
import type { ILeafData } from "../components/LeavesContainer";

export function useAnalyzerPage() {
  const dispatch = useDispatch();
  const [selectedLeaf, setSelectedLeaf] = useState<ILeafData | null>(null);
  const openLeafFullInfo = useCallback((leaf: ILeafData) => {
    setSelectedLeaf(leaf);
  }, []);

  const closeLeafFullInfo = useCallback(() => {
    setSelectedLeaf(null);
  }, []);
  const { leaves, addLeavesFromImages, handleDeleteLeaves } = useLeavesState();
  const [selectedImage, setSelectedImage] = useState<IImageData | null>(null);

  const selectedGenus = useSelector(selectGenus);
  const images = useSelector(selectImages);

  const openImageFullInfo = useCallback((image: IImageData) => {
    setSelectedImage(image);
  }, []);

  const closeImageFullInfo = useCallback(() => {
    setSelectedImage(null);
  }, []);
  const { getImageFile, addImages, deleteImage, updateImageStatus } =
    useImageState();

  const { processImagesWs, progress, isProcessing } =
    usePredictionWsSession(getImageFile);

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

    addLeavesFromImages(processed);
  }, [dispatch, images, selectedGenusId, processImagesWs, addLeavesFromImages]);
  return {
    selectedImage,
    selectedLeaf,
    addImages,
    deleteImage,
    updateImageStatus,
    openImageFullInfo,
    closeImageFullInfo,
    openLeafFullInfo,
    closeLeafFullInfo,
    handleProcessImages,
    leaves,
    handleDeleteLeaves,
    progress,
    isProcessing,
  };
}

import { Box } from "@mui/material";
import { ImageCard } from "./ImageCard";
import type { IImageData, ImageStatusType } from "@/shared/types/image";
import { memo, useMemo } from "react";

interface ImagesContainerProps {
  images: IImageData[];
  onOpen: (image: IImageData) => void;
  onDelete: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatusType) => void;
}

export const ImagesContainer: React.FC<ImagesContainerProps> = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
  onUpdate: handleUpdateImage,
}) => (
  <Box
    sx={{
      flexWrap: "wrap",
      width: "100%",
      display: "flex",
      padding: "1rem",
      justifyContent: "center",
      gap: "1rem",
      maxHeight: "900px",
      overflowY: "auto",
    }}
  >
    {images.map((image, index) => (
      <ImageCard
        onOpen={(image) => handleOpenImageFullInfo(image)}
        onDelete={handleDeleteImage}
        onUpdate={handleUpdateImage}
        image={image}
        key={index}
      />
    ))}
  </Box>
);

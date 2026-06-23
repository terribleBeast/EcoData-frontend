import { Box } from "@mui/material";
import { ImageCard } from "./ImageCard";
import type { IImageData, ImageStatusType } from "@/shared/types/image";
import { UploadTile } from "./UploadTile";
import { useImageDropzone } from "../hooks/useImageDropZone";

interface ImagesContainerProps {
  images: IImageData[];
  onOpen: (image: IImageData) => void;
  onDelete: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatusType) => void;
  addImages: (files: File[]) => void;
}

export const ImagesContainer: React.FC<ImagesContainerProps> = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
  onUpdate: handleUpdateImage,
  addImages,
}) => {
  const { getRootProps, getInputProps } = useImageDropzone({
    onFilesAdded: addImages,
  });
  return (
    <Box
      sx={{
        flexWrap: "wrap",
        width: "100%",
        maxWidth: "80dvw",
        display: "flex",
        padding: "1rem",
        justifyContent: "center",
        gap: "1rem",
        maxHeight: "900px",
        overflowY: "auto",
      }}
    >
      <UploadTile getRootProps={getRootProps} getInputProps={getInputProps} />
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
};

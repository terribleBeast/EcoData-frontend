import { Box, Typography } from "@mui/material";
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
  settedGenus: boolean;
}

export const ImagesContainer: React.FC<ImagesContainerProps> = ({
  images,
  onOpen: handleOpenImageFullInfo,
  onDelete: handleDeleteImage,
  onUpdate: handleUpdateImage,
  addImages,
  settedGenus,
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
      {settedGenus ? (
        <>
          <UploadTile
            getRootProps={getRootProps}
            getInputProps={getInputProps}
          />
          {images.map((image, index) => (
            <ImageCard
              onOpen={(image) => handleOpenImageFullInfo(image)}
              onDelete={handleDeleteImage}
              onUpdate={handleUpdateImage}
              image={image}
              key={index}
            />
          ))}
        </>
      ) : (
        <Typography
          sx={{ color: "text.secondary", fontStyle: "italic", padding: "1rem" }}
        >
          Выберите род растения
        </Typography>
      )}
    </Box>
  );
};

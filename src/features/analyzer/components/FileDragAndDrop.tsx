import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import type { IImageData, ImageStatusType } from "@/shared/types/image";

interface FileDragAndDropProps {
  onImagesAdded: (newImages: IImageData[]) => void;
  defaultStatus: ImageStatusType;
  selectedClassifier: string;
}

export const FileDragAndDrop = ({
  onImagesAdded,
  defaultStatus,
  selectedClassifier,
}: FileDragAndDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: IImageData[] = acceptedFiles.map((file) => ({
        id: Math.random(),
        src: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        name: file.name,
        file,
        key: `file-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        predictions: undefined,
        status: defaultStatus,
        classifier: selectedClassifier,
      }));
      onImagesAdded(newFiles);
    },
    [selectedClassifier, onImagesAdded, defaultStatus],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "divider",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          mb: 3,
          cursor: "pointer",
          bgcolor: isDragActive ? "action.hover" : "background.paper",
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload
          fontSize="large"
          color={isDragActive ? "primary" : "action"}
        />
        <Typography>
          {isDragActive
            ? "Отпустите файлы здесь"
            : "Перетащите файлы сюда или кликните для выбора"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Поддерживаются изображения
        </Typography>
      </Box>
    </Box>
  );
};

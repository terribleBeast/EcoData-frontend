import { useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import type { IImageData, ImageStatusType } from "@/shared/types/image";

export interface IFileDragAndDropProps {
  onImagesAdded: (newImages: IImageData[]) => void;
  defaultStatus: ImageStatusType;
  selectedClassifier: string;
}

export const FileDragAndDrop = ({
  onImagesAdded,
  defaultStatus,
  selectedClassifier,
}: IFileDragAndDropProps) => {
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
    <Paper
      {...getRootProps()}
      sx={{
        padding: "0.5rem",
        width: "150px",
        // boxShadow: borderStyle,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <input {...getInputProps()} />
          <CloudUpload
            fontSize="large"
            color={isDragActive ? "primary" : "action"}
          />
          {/*<Typography>
            {isDragActive
              ? "Отпустите файлы здесь"
              : "Перетащите файлы сюда или кликните для выбора"}
          </Typography>*/}
          <Typography variant="caption" color="text.secondary">
            Поддерживаются изображения
          </Typography>
        </Box>
        {/*</Box>*/}
        {/*</Box>*/}
      </Box>
    </Paper>
  );
};

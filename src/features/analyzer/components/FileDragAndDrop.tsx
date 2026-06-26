import { useCallback } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

export interface IFileDragAndDropProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export const FileDragAndDrop = ({
  onFilesAdded,
  disabled = false,
}: IFileDragAndDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    multiple: true,
    maxSize: 10,
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        padding: "0.5rem",
        width: "150px",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
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
          textAlign: "center",
        }}
      >
        <Box>
          <input {...getInputProps()} />

          <CloudUpload
            fontSize="large"
            color={isDragActive ? "primary" : "action"}
          />

          <Typography variant="caption" color="text.secondary">
            {disabled ? "Сначала выберите род" : "Поддерживаются изображения"}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

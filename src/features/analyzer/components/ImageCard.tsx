import { memo, useEffect, useMemo, useRef } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
} from "@/shared/types/image";
import { getBestPrediction, getStatusBorderColor } from "../utils";

interface ImageCardProps {
  image: IImageData;
  onDelete: (image: IImageData) => void;
  onOpen: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatusType) => void;
}

export const ImageCard = memo(
  ({ image, onDelete, onOpen, onUpdate }: ImageCardProps) => {
    const initialized = useRef(false);

    useEffect(() => {
      if (!initialized.current && image.status === ImageStatus.LOADING) {
        initialized.current = true;
        onUpdate(image, ImageStatus.UPLOADED);
      }
    }, [image, onUpdate]);

    const borderStyle = getStatusBorderColor(image.status);
    const bestPrediction = getBestPrediction(image);

    return (
      <Paper
        sx={{
          padding: "0.5rem",
          width: "150px",
          boxShadow: borderStyle,
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
          <img
            src={image.src ?? "no-image-icon_1200.png"}
            alt="изображение"
            width="100px"
            height="100px"
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => onOpen(image)}
          />
        </Box>

        <Box>
          <Typography sx={{ overflowWrap: "break-word", fontWeight: "bold" }}>
            {image.name || "Не найдено"}
          </Typography>
          <Typography>
            {bestPrediction ? bestPrediction.classifier : "Нет предсказаний"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Delete
            sx={{ color: "red", fontSize: "medium", cursor: "pointer" }}
            onClick={() => onDelete(image)}
          />
        </Box>
      </Paper>
    );
  },
);

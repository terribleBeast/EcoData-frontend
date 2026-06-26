import { memo, useEffect, useRef } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  ImageStatus,
  type IImageData,
  type ImageStatusType,
  type IPrediction,
} from "@/shared/types/image";
import { getStatusBorderColor } from "../utils";

interface ImageCardProps {
  image: IImageData;
  prediction?: IPrediction;
  leafCount?: number;
  onDelete: (image: IImageData) => void;
  onOpen: (image: IImageData) => void;
  onUpdate: (image: IImageData, newStatus: ImageStatusType) => void;
}
export const ImageCard = memo(
  ({
    image,
    prediction,
    leafCount,
    onDelete,
    onOpen,
    onUpdate,
  }: ImageCardProps) => {
    const initialized = useRef(false);

    useEffect(() => {
      if (!initialized.current && image.status === ImageStatus.LOADING) {
        initialized.current = true;
        onUpdate(image, ImageStatus.UPLOADED);
      }
    }, [image, onUpdate]);

    const borderStyle = getStatusBorderColor(image.status);

    return (
      <Paper
        sx={{
          width: "150px",
          height: "250px",
          padding: "0.6rem",
          boxShadow: borderStyle,
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          onClick={() => onOpen(image)}
          sx={{
            width: "100%",
            height: "110px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            backgroundColor: "#F7FAF7",
            cursor: "pointer",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={image.src ?? "no-image-icon_1200.png"}
            alt={image.name || "изображение"}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </Box>

        <Box
          sx={{
            marginTop: "0.6rem",
            flexGrow: 1,
            minHeight: 0,
          }}
        >
          <Typography
            title={image.name}
            sx={{
              fontWeight: 700,
              fontSize: "1.2rem",
              lineHeight: 1.25,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              wordBreak: "break-word",
            }}
          >
            {image.name || "Не найдено"}
          </Typography>

          {leafCount !== undefined && (
            <Typography
              sx={(theme) => ({
                marginTop: "1rem",
                fontSize: "1.2rem",
                lineHeight: 1.15,
                fontWeight: 600,
                color: theme.palette.secondary.main,
              })}
            >
              Листьев: {leafCount}
            </Typography>
          )}

          {prediction && (
            <Box sx={{ marginTop: "0.25rem" }}>
              <Typography
                title={prediction.classifier}
                sx={{
                  fontSize: "1.2rem",
                  lineHeight: 1.15,
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginTop: "0.5rem",
                }}
              >
                {prediction.classifier}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: "success.dark",
                  marginTop: "0.25rem",
                }}
              >
                {prediction.probability.toFixed(2)}%
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexShrink: 0,
            marginTop: "0.4rem",
          }}
        >
          <Delete
            sx={(theme) => ({
              color: theme.palette.error.main,
              fontSize: "1.1rem",
              cursor: "pointer",
            })}
            onClick={() => onDelete(image)}
          />
        </Box>
      </Paper>
    );
  },
);

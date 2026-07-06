// ── Image types matching DB images table + /api/v1/images endpoints ──

import { theme } from "@/app/theme";

export const ImageStatus = {
  LOADING: "Загрузка",
  UPLOADED: "Загружен",
  PROCESSING: "В обработке",
  PROCESSED: "Обработан",
  ERROR: "Ошибка",
  UNKNOWN: "Неизвестно",
} as const;

export type ImageStatusType = (typeof ImageStatus)[keyof typeof ImageStatus];

export const STATUS_BORDER_COLORS: Record<ImageStatusType, string> = {
  [ImageStatus.LOADING]: "#4F93B5", // спокойный голубой
  [ImageStatus.UPLOADED]: "#C7952B", // тёплая охра
  [ImageStatus.PROCESSING]: "#4E6FAE", // мягкий синий
  [ImageStatus.PROCESSED]: "#3F8A4F", // насыщенный природный зелёный
  [ImageStatus.ERROR]: "#B85F47", // терракотово-красный
  [ImageStatus.UNKNOWN]: "#7C867A", // серо-зелёный
};

/** Prediction result from neural model */
export interface IPrediction {
  classifier: string;
  probability: number;
}

/** API response shape for image records (GET /api/v1/images) */
export interface IImageResponse {
  id: string; // UUID
  file_id: string; // UUID → files
  width_px?: number | null;
  height_px?: number | null;
  image_type: string; // "original" | "cropped" | "processed" | "visualisation"
  uploaded_by_user_id?: string | null; // UUID
  uploaded_at: string; // ISO datetime
}

/** Create image metadata (POST /api/v1/images) */
export interface ImageCreate {
  file_id: string; // UUID
  width_px?: number | null;
  height_px?: number | null;
  image_type?: string; // default "original"
  uploaded_by_user_id?: string | null;
}

// ── Local (client-side) image state used in the Analyzer UI ──

export interface IImageData {
  id: string;
  key: string;

  name: string;
  size: number;

  // Use this for preview in UI.
  src: string;

  // Optional alias if some components still use previewUrl.
  previewUrl?: string;

  status: ImageStatusType;
  predictions: IPrediction[];

  // Optional because before prediction there is no classifier.
  classifier?: string;
}

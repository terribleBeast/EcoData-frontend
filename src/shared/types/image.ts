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
  [ImageStatus.LOADING]: "#3C9DD0",
  [ImageStatus.UPLOADED]: "yellow",
  [ImageStatus.PROCESSING]: "blue",
  [ImageStatus.PROCESSED]: "green",
  [ImageStatus.ERROR]: "red",
  [ImageStatus.UNKNOWN]: "gray",
};
export interface IPrediction {
  classifier: string;
  probability: number;
}
export interface IImageData {
  id: number;
  key: string;
  src: string | undefined;
  file: File;
  name: string;
  predictions?: IPrediction[];
  status: ImageStatusType;
  classifier: string;
}

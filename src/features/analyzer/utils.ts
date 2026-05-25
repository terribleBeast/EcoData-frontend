import {
  STATUS_BORDER_COLORS,
  type IImageData,
  type ImageStatusType,
} from "@/shared/types/image";

export function exportImagesToCsv(images: IImageData[]): void {
  if (!images || images.length === 0) {
    console.warn("No images to export");
    return;
  }

  const allSpecies = new Set<string>();
  images.forEach((image) => {
    image.predictions?.forEach((pred) => allSpecies.add(pred.classifier));
  });
  const species = Array.from(allSpecies);

  const rows: string[] = [["Id", "Изображение", "Род", ...species].join(",")];

  images.forEach((image, index) => {
    const row: (string | number)[] = [
      index + 1,
      image.name || "Unknown",
      image.classifier,
    ];

    species.forEach((speciesName) => {
      const prediction = image.predictions?.find(
        (p) => p.classifier === speciesName,
      );
      row.push(prediction ? prediction.probability : "");
    });

    rows.push(row.join(","));
  });

  const blob = new Blob([rows.join("\n")], {
    type: "data:text/csv;charset=UTF-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "result.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getBestPrediction(image: IImageData) {
  if (!image.predictions || image.predictions.length === 0) return null;
  return image.predictions.reduce((max, current) =>
    current.probability > max.probability ? current : max,
  );
}

export function getStatusBorderColor(status: ImageStatusType): string {
  return `0 0 4px ${STATUS_BORDER_COLORS[status]}`;
}

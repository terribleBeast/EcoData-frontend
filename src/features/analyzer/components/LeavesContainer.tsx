import Box from "@mui/material/Box";
import { ImageCard } from "./ImageCard";
import type { IImageData, IPrediction } from "@/shared/types/image";
import { Typography } from "@mui/material";

export interface ILeafData {
  leaf_id: string;
  image_id: number;
  selected_species_id: string;
  predictionResults: IPrediction;
}

interface LeavesContainerProps {
  /** Map<image, leaves[]> — one image can have many leaves */
  images: IImageData[];
  leavesImage: Map<number, ILeafData[]>;
  onDelete: (leaf_id: string) => void;
  addLeaves: (leaves: ILeafData[]) => void;
}

export const LeavesContainer = ({
  addLeaves,
  onDelete,
  images,
  leavesImage,
}: LeavesContainerProps) => {
  // Flatten all leaves from the Map, keeping a reference to their parent image

  const leafEntries: { leaf: ILeafData; image: IImageData }[] = [];
  leavesImage.forEach((leaf, image_id) => {
    leaf.forEach((leaf) => {
      leafEntries.push({ leaf, image: images[image_id] });
    });
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
      {leafEntries.map(({ leaf, image }, index) => (
        <ImageCard
          key={leaf.leaf_id}
          image={image}
          onOpen={() => {}}
          onDelete={() => onDelete(leaf.leaf_id)}
          onUpdate={() => {}}
        />
      ))}
      {leafEntries.length === 0 && (
        <Typography
          sx={{ color: "text.secondary", fontStyle: "italic", padding: "1rem" }}
        >
          Нет листьев — загрузите изображения и запустите обработку
        </Typography>
      )}
    </Box>
  );
};

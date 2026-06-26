import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { ImageCard } from "./ImageCard";
import type { IImageData, IPrediction } from "@/shared/types/image";

export interface ILeafData {
  leaf_id: string;
  image_key: string;
  image: IImageData;
  predictions: IPrediction[];
  bestPrediction?: IPrediction;
  plantId?: string;
  draftPlantId?: string;
}
interface LeavesContainerProps {
  leaves: ILeafData[];
  onDelete: (leaf_id: string) => void;
  onOpen: (leaf: ILeafData) => void;
}

export const LeavesContainer = ({
  leaves,
  onDelete,
  onOpen,
}: LeavesContainerProps) => {
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
      {leaves.map((leaf) => (
        <ImageCard
          key={leaf.leaf_id}
          image={leaf.image}
          prediction={leaf.bestPrediction}
          onOpen={() => onOpen(leaf)}
          onDelete={() => onDelete(leaf.leaf_id)}
          onUpdate={() => {}}
        />
      ))}
      {leaves.length === 0 && (
        <Typography
          sx={{ color: "text.secondary", fontStyle: "italic", padding: "1rem" }}
        >
          Выполните анализ изображений, чтобы увидеть полученные листья
        </Typography>
      )}
    </Box>
  );
};

import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import { DialogSection } from "@/shared/ui/layout";
import type { ILeafData } from "./LeavesContainer";
import { InfoTable, PercentBar } from "./InfoTable";
import type { IPlantDataFull } from "@/shared/types";

interface LeafFullInfoProps {
  leaf: ILeafData;
  plants: IPlantDataFull[];
  leafGenusId: string;
  onChangePlantDraft: (leafId: string, plantId: string) => void;
}
const getPlantId = (plant: IPlantDataFull): string => {
  return ((plant as any).plant_id ?? (plant as any).id).toString();
};
const getPlantGenusId = (plant: IPlantDataFull): string | undefined => {
  const species = plant.plant_description?.species as any;
  return (
    species?.genus_id?.toString() ??
    species?.genusId?.toString() ??
    species?.genus?.id?.toString()
  );
};

const getPlantLabel = (plant: IPlantDataFull): string => {
  const species = plant.plant_description?.species as any;

  const speciesName =
    species?.russian_name ??
    species?.latin_name ??
    species?.name ??
    "Вид не указан";

  // const plantName = plant.description ?? plant.additional_info ?? plant.id;

  // return `${speciesName} · ${plantName}`;
  return `${speciesName}`;
};

export const LeafFullInfo = ({
  leaf,
  leafGenusId,
  onChangePlantDraft,
  plants,
}: LeafFullInfoProps) => {
  const sortedPredictions = [...leaf.predictions].sort(
    (a, b) => b.probability - a.probability,
  );

  const availablePlants = plants.filter(
    (plant) => getPlantGenusId(plant) === leafGenusId,
  );

  console.log("plants", plants);

  const selectedPlantId = leaf.draftPlantId ?? leaf.plantId ?? "";

  return (
    <DialogPanel>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          borderRadius: "16px",
        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: "2.2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
            alignSelf: "center",
          })}
        >
          Лист
        </Typography>

        <img
          src={leaf.image.src ?? "no-image-icon_1200.png"}
          alt={leaf.image.name}
          width="100%"
          style={{
            borderRadius: "12px",
            objectFit: "contain",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
            gap: "0.75rem",
          }}
        >
          <Button variant="contained" color="success">
            Лупа
          </Button>

          <Button
            href={leaf.image.src ?? ""}
            target="_blank"
            variant="contained"
            color="success"
          >
            Открыть в новой вкладке
          </Button>

          <Button variant="contained" color="success">
            Линейка
          </Button>
        </Box>
      </Paper>

      <DialogSection title="Информация">
        <InfoTable
          title="Общая информация"
          rows={[
            {
              label: "Растение",
              value: (
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={selectedPlantId}
                  disabled={availablePlants.length === 0}
                  onChange={(event) => {
                    onChangePlantDraft(leaf.leaf_id, event.target.value);
                  }}
                  helperText={
                    availablePlants.length === 0
                      ? "Нет растений того же рода"
                      : "Выберите растение того же рода"
                  }
                  sx={{ minWidth: 260 }}
                >
                  <MenuItem value="" disabled>
                    Не выбрано
                  </MenuItem>

                  {availablePlants.map((plant) => {
                    const plantId = getPlantId(plant);

                    return (
                      <MenuItem key={plantId} value={plantId}>
                        {getPlantLabel(plant)}
                      </MenuItem>
                    );
                  })}
                </TextField>
              ),
            },
            {
              label: "Исходное изображение",
              value: leaf.image.name,
            },
            {
              label: "Лучшее совпадение",
              value: leaf.bestPrediction ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    size="medium"
                    color="success"
                    label={leaf.bestPrediction.classifier}
                  />
                  <Typography sx={{ fontWeight: 600 }}>
                    {leaf.bestPrediction.probability.toFixed(2)}%
                  </Typography>
                </Box>
              ) : (
                "Нет данных"
              ),
            },
          ]}
        />

        <InfoTable
          title="Вероятности классификации"
          rows={
            sortedPredictions.length > 0
              ? sortedPredictions.map((prediction, index) => ({
                  label: `${index + 1}. ${prediction.classifier}`,
                  value: <PercentBar value={prediction.probability} />,
                }))
              : [
                  {
                    label: "Вероятности",
                    value: "Нет данных о классификации",
                  },
                ]
          }
        />
      </DialogSection>
    </DialogPanel>
  );
};

export default LeafFullInfo;

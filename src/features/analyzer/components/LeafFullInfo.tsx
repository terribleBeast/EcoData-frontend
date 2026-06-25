import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import { DialogSection } from "@/shared/ui/layout";
import type { ILeafData } from "./LeavesContainer";
import { InfoTable, PercentBar } from "./InfoTable";

interface LeafFullInfoProps {
  leaf: ILeafData;
}

export const LeafFullInfo = ({ leaf }: LeafFullInfoProps) => {
  const sortedPredictions = [...leaf.predictions].sort(
    (a, b) => b.probability - a.probability,
  );

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
              label: "Исходное изображение",
              value: leaf.image.name,
            },
            {
              label: "Лучшее совпадение",
              value: leaf.bestPrediction ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    size="small"
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

import { Button, Typography, Box, Paper, Chip } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import { type IImageData } from "../../../shared/types/image";
import { DialogSection } from "@/shared/ui/layout";
import type { ILeafData } from "./LeavesContainer";
import { InfoTable, PercentBar, StatusBadge } from "./InfoTable";

interface ImageFullInfoProps {
  image: IImageData;
  leaves: ILeafData[];
}

export const ImageFullInfo = ({ image, leaves }: ImageFullInfoProps) => {
  const imageLeaves = leaves.filter((leaf) => leaf.image_key === image.key);

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
          Изображение
        </Typography>

        <img
          src={image.src ?? "no-image-icon_1200.png"}
          alt={image.name}
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
            href={image.src ?? ""}
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
              label: "Имя файла",
              value: image.name,
            },
            {
              label: "Статус",
              value: <StatusBadge status={image.status} />,
            },
            {
              label: "Количество листьев",
              value: imageLeaves.length,
            },
          ]}
        />

        <InfoTable
          title="Листья изображения"
          rows={
            imageLeaves.length > 0
              ? imageLeaves.map((leaf, index) => ({
                  label: `Лист ${index + 1}`,
                  value: leaf.bestPrediction ? (
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {leaf.bestPrediction.classifier}
                      </Typography>
                      <PercentBar value={leaf.bestPrediction.probability} />
                    </Box>
                  ) : (
                    "Нет данных о классификации"
                  ),
                }))
              : [
                  {
                    label: "Листья",
                    value: "Для этого изображения листья пока не созданы",
                  },
                ]
          }
        />
      </DialogSection>
    </DialogPanel>
  );
};

export default ImageFullInfo;

import type { IPlantDataFull } from "@/shared/types/plant";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type SpeciesLike = {
  name?: string;
  latin_name?: string;
  russian_name?: string | null;
};

export const ResearchPlantsList = ({
  plants = [],
}: {
  plants?: IPlantDataFull[];
}) => {
  if (!plants.length) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        Растения не добавлены к исследованию
      </Typography>
    );
  }

  return (
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell>Вид</TableCell>
          <TableCell>Жизненная форма</TableCell>
          <TableCell>Тип листовой пластинки</TableCell>
          <TableCell>Описание</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {plants.map((plant, index) => {
          const description = plant.plant_description;
          const species = description?.species as SpeciesLike | undefined;

          return (
            <TableRow key={plant.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {species?.russian_name ??
                  species?.latin_name ??
                  species?.name ??
                  "—"}
              </TableCell>
              <TableCell>{description?.plant_life_form?.name ?? "—"}</TableCell>
              <TableCell>{description?.leaf_blade_type?.name ?? "—"}</TableCell>
              <TableCell>
                {plant.description ?? description?.description ?? "—"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

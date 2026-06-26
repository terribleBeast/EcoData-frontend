import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { IPlantLeafData } from "@/shared/types/plant";

type Props = {
  leaves?: IPlantLeafData[];
};

export const PlantLeavesList = ({ leaves = [] }: Props) => {
  if (!leaves.length) {
    return (
      <Typography sx={{ p: 2 }} color="text.secondary">
        Листья не добавлены к растению
      </Typography>
    );
  }

  return (
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell>ID листа</TableCell>
          <TableCell>Индекс</TableCell>
          <TableCell>Сторона света</TableCell>
          <TableCell>Расположение на растении</TableCell>
          <TableCell>Дата создания</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {leaves.map((leaf, index) => (
          <TableRow key={leaf.leaf_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{leaf.leaf_id}</TableCell>
            <TableCell>{leaf.leaf_index ?? "—"}</TableCell>
            <TableCell>{leaf.side_of_the_world?.name ?? "—"}</TableCell>
            <TableCell>{leaf.location_on_plant?.name ?? "—"}</TableCell>
            <TableCell>
              {leaf.created_at
                ? new Date(leaf.created_at).toLocaleDateString()
                : "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

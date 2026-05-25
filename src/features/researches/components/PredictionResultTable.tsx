import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { LoadingComponent } from "@/shared/components";
import type { IPredictionTable } from "@/shared/types/research";

export const ResultTable = ({
  data,
  isLoading,
}: {
  data: IPredictionTable;
  isLoading: boolean;
}) => {
  if (isLoading) return <LoadingComponent />;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {data.headers.map((name, index) => (
            <TableCell key={index}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((value, index) => (
              <TableCell key={index}>{value.probability}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

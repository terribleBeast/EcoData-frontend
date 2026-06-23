import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { LoadingState } from "@/shared/components";
import type { IPredictionTable } from "@/shared/types/research";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { QueryErrorState } from "@/shared/ui/states/ErrorState";

export const ResultTable = ({
  predictionQuery,
}: {
  predictionQuery: {
    data?: IPredictionTable;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  if (predictionQuery.isLoading) {
    return <LoadingState />;
  }

  if (predictionQuery.isError) {
    return <QueryErrorState error={predictionQuery.error} />;
  }

  if (!predictionQuery.data) {
    return (
      <Typography
        sx={{
          padding: "1rem",
          color: "text.secondary",
          fontStyle: "italic",
        }}
      >
        Нет результатов
      </Typography>
    );
  }
  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell key={0}>№</TableCell>
          {predictionQuery.data.headers.map((name, index) => (
            <TableCell key={index}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {predictionQuery.data.rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell key={0}>{index + 1}</TableCell>
            {row.map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

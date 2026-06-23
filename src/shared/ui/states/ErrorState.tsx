import { Box, Typography } from "@mui/material";

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import type { SerializedError } from "@reduxjs/toolkit";
import { deriveErrorMessage } from "../../utils";

interface QueryErrorStateProps {
  error?: FetchBaseQueryError | SerializedError;
}

export const QueryErrorState = ({ error }: QueryErrorStateProps) => (
  <ErrorState message={deriveErrorMessage(error)} />
);
interface ErrorStateProps {
  message: string;
}

export const ErrorState = ({ message }: ErrorStateProps) => (
  <Box
    sx={{
      p: 3,
      textAlign: "center",
    }}
  >
    <Typography color="error" variant="h6">
      Ошибка
    </Typography>

    <Typography color="text.secondary">{message}</Typography>
  </Box>
);

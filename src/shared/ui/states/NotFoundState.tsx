import { Box, Typography } from "@mui/material";

export const NotFoundState = ({ msg }: { msg?: string }) => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <Typography color="text.secondary">
      {" "}
      {msg ? msg : "Объект не найден"}
    </Typography>
  </Box>
);

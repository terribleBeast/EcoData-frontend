import { Box, Typography } from "@mui/material";

export const LoadingState = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Typography
      sx={(theme) => ({
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        fontWeight: 600,
        color: theme.palette.secondary.main,
      })}
    >
      Загрузка...
    </Typography>
  </Box>
);

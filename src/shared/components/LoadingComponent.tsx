import { Box, Typography } from "@mui/material";

export const LoadingComponent = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Typography
      sx={(theme) => ({
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        fontWeight: 600,
        color: theme.palette.secondary.main,
      })}
      style={{ fontSize: "18px" }}
    >
      Загрузка...
    </Typography>
  </Box>
);

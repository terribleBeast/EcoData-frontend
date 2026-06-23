import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

export const NotValidRouteComponent = () => {
  const navigate = useNavigate();
  const currLocation = useLocation();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <Typography
        sx={(theme) => ({
          fontSize: "2.2rem",
          marginBottom: "1.5rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
        })}
      >
        Маршрута '{currLocation.pathname}' не существует
      </Typography>
      <Button onClick={() => navigate("/")} color="success" variant="outlined">
        <Typography>Перейти на главную</Typography>
      </Button>
    </Box>
  );
};

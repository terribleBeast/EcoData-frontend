import { Box, Button, Typography } from "@mui/material";
import { useNavigate, redi, useLocation } from "react-router";

export const LoadingPage = () => (
  <Box
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  >
    <Typography className="chapter-title" style={{ fontSize: "18px" }}>
      Загрузка...
    </Typography>
  </Box>
);

export const NotValidRoutePage = () => {
  const navigate = useNavigate();
  const currLocation = useLocation();

  return (
    <main>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography className="chapter-title">
          Маршрута '{currLocation.pathname}' не существует
        </Typography>
        <Button
          onClick={() => navigate("/")}
          color="success"
          variant="outlined"
        >
          <Typography>Перейти на главную</Typography>
        </Button>
      </Box>
    </main>
  );
};

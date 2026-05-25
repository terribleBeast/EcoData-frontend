import { Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SpaIcon from "@mui/icons-material/Spa";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  userLoggedOut,
} from "@/features/user/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsAuthenticated);
  return (
    <AppBar position="static" sx={{ width: "100dvw" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          component={Link}
          to="/"
        >
          <SpaIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          EcoData
        </Typography>

        {isLogIn ? (
          <Box>
            <Button
              color="inherit"
              onClick={() => {
                dispatch(userLoggedOut());
                navigate("/auth");
              }}
              sx={{ textTransform: "none" }}
            >
              {/*<Typography>{user?.name} </Typography>*/}
              Выйти
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/auth")}>
            Войти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

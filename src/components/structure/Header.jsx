import { Typography, AppBar, Toolbar, Button, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { memo } from "react";
// import MenuIcon from '@mui/icons-material/Menu';
import SpaIcon from "@mui/icons-material/Spa";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserIsLogIn,
  selectUserName,
  toLogOut,
} from "../../features/user/userSlice";

function Header() {
  const navigate = useNavigate();
  const isLogIn = useSelector(selectUserIsLogIn);
  const name = useSelector(selectUserName);
  const dispatch = useDispatch();
  console.log("Header rendered");
  return (
    <header>
      <AppBar position="static" className="AppBar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            LinkComponent={Link}
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
                  dispatch(toLogOut);
                  navigate("/auth");
                }}
                style={{
                  textTransform: "none",
                }}
              >
                <Typography>{name}</Typography>
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => navigate("/auth")}>
              Войти
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;

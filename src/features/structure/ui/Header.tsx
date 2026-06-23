import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Box,
  Link as MuiLink,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserInfo,
  userLoggedOut,
} from "@/features/user/authSlice";

function Header({
  handleToggleLeftMenu,
}: {
  handleToggleLeftMenu: () => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUserInfo);
  const username = `${user?.surname} ${user?.name[0]}. ${user?.surname[0]}.`;
  return (
    <AppBar position="static" sx={{ width: "100%" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            direction: "row",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggleLeftMenu}
          >
            <MenuIcon />
          </IconButton>
          <MuiLink
            component={RouterLink}
            to="/"
            style={{
              all: "unset",
              cursor: "pointer",
              alignContent: "center",
            }}
          >
            <Typography variant="h6">EcoData</Typography>
          </MuiLink>
        </Box>
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
              {user ? <Typography>{username} </Typography> : "Выйти"}
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

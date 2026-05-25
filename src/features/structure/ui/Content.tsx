import { Box } from "@mui/material";
import LeftMenu from "../components/LeftMenu";
import { Outlet } from "react-router";

function Content() {
  return (
    <Box
      component="main"
      sx={(theme) => ({
        padding: 0,
        backgroundColor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "row",
        minHeight: "875pt",
      })}
    >
      {/*{ TODO: Toggle menu, and }*/}
      <LeftMenu />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%",
          height: "100%",
        })}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Content;

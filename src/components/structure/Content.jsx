// import '../App.css'
import { Box } from "@mui/material";
import LeftMenu from "../LeftMenu";
import { Outlet } from "react-router";

function Content() {
  return (
    <Box>
      <main style={{ height: "100hv" }}>
        <LeftMenu></LeftMenu>
        <div className="content-surface">
          <Outlet />
        </div>
      </main>
    </Box>
  );
}

export default Content;

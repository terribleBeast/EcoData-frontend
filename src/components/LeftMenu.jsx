import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router";
import { pages } from "../entities";

const LeftMenu = () => {
  const currLocation = useLocation();

  // TODO: Troubles with rendering list
  const menuItems = useMemo(
    () =>
      pages.map((item) => (
        <ListItemButton
          component={Link}
          to={item.link}
          className="listItemButton"
          selected={currLocation.pathname.slice(1) === item.link}
          key={item.link}
        >
          {item.icon}
          <Typography>{item.name}</Typography>
        </ListItemButton>
      )),
    [currLocation.pathname],
  );

  return (
    <Box className="sidebar">
      <List>{menuItems}</List>
    </Box>
  );
};

export default LeftMenu;

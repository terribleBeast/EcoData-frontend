import { Box, List, ListItemButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import { menuItems, type MenuItemData } from "@/app/routes";
import { memo } from "react";

interface IMenuItem extends MenuItemData {
  isSelected: boolean;
  key: number;
}

const MenuItem = memo(
  (data: IMenuItem) => (
    <ListItemButton
      component={Link}
      to={data.path}
      selected={data.isSelected}
      key={data.path}
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.75rem 1rem",
        cursor: "pointer",
        borderBottom: `1px solid ${theme.palette.border}`,
        borderRadius: "8px",
        margin: "0 0.5rem 0.25rem 0.5rem",
        color: theme.palette.text.primary,
        "&:hover": {
          backgroundColor: theme.palette.menuHover,
        },
        "&.Mui-selected": {
          backgroundColor: theme.palette.activeItem,
          fontWeight: 600,
        },
      })}
    >
      {<data.icon />}
      <Typography>{data.title}</Typography>
    </ListItemButton>
  ),
  (oldProps, newProps) => oldProps.isSelected === newProps.isSelected,
);

const LeftMenu = () => {
  const currLocation = useLocation();
  console.log(currLocation.pathname.split("/")[1]);
  const menuItemsElements = menuItems.map((item, index) => {
    return (
      <MenuItem
        {...item}
        key={index}
        isSelected={currLocation.pathname.split("/")[1] === item.path}
      />
    );
  });

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        width: "auto",
        backgroundColor: theme.palette.menuBg,
        borderRight: `1px solid ${theme.palette.border}`,
        flexDirection: "column",
      })}
    >
      <List disablePadding>{menuItemsElements}</List>
    </Box>
  );
};

export default LeftMenu;

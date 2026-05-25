import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        p: 2,
        display: "flex",
        width: "100%",
        borderTop: 1,
        borderColor: theme.palette.border,
        fontSize: "0.85rem",
        color: theme.palette.text.secondary,
        bgcolor: theme.palette.primary.light,
        justifyContent: "space-between",
      })}
    >
      <Typography>© Altai State University, 2025</Typography>
      <Typography>Контакты: ecodataHelper@gmail.com</Typography>
    </Box>
  );
}

export default Footer;

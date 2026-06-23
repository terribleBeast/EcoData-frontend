import { Box, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";

export const Page = React.memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.backgroundPage,
        border: `1px solid ${theme.palette.border}`,
        borderRadius: "5px",
        height: "100dvh",
        width: "100%",
        minHeight: "max-content",
        minWidth: "max-content",
        margin: "1.5rem",
        padding: "1.5rem",
        display: "inline-block",
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: "3rem",
          marginBottom: "2rem",
          color: theme.palette.primary.main,
        })}
      >
        {title}
      </Typography>
      {children}
      <Outlet />
    </Box>
  ),
);

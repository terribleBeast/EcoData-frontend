import type { SxProps, Theme } from "@mui/material";

export const formStyle: SxProps<Theme> = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

export const formTitleStyle = {
  textAlign: "center",
  fontSize: "1.5rem",
  fontWeight: 600,
  marginBottom: "1.5rem",
  color: "text.primary",
};

export const actionLinkSx: SxProps<Theme> = (theme) => ({
  textTransform: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  padding: 0,
  minWidth: "auto",
  alignSelf: "flex-start",
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.dark,
    textDecoration: "underline",
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
    borderRadius: "4px",
  },
});

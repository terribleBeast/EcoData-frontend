import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    menuBg: string;
    menuHover: string;
    activeItem: string;
    surface: string;
    border: string;
    backgroundPage: string;
  }
  interface PaletteOptions {
    menuBg?: string;
    menuHover?: string;
    activeItem?: string;
    surface?: string;
    border?: string;
    backgroundPage?: string;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
      light: "#66bb6a",
      dark: "#1b5e20",
    },
    secondary: {
      main: "#2e7d32",
      light: "",
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#555555",
    },
    menuBg: "#f5f5f5",
    menuHover: "#e0f2f1",
    activeItem: "#c8e6c9",
    surface: "#f5f9f8",
    border: "#e0e0e0",
    backgroundPage: "#edf8f5",
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "5px",
          boxShadow: theme.shadows[3],
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "5px",
          boxShadow: theme.shadows[3],
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", "Segoe UI", sans-serif',
        },
      },
    },
  },
});

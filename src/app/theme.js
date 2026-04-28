import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
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
      // fontSize: 16,
      fontFamily: "Segoe UI",
    },
  },
});

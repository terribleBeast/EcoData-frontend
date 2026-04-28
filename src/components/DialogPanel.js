import { Box } from "@mui/material";
export const DialogPanel = ({ style: customStyle, children }) => (
  <Box
    style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      margin: "1rem",
    }}
    sx={customStyle}
  >
    {children}
  </Box>
);

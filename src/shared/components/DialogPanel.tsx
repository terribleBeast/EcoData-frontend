import { Box } from "@mui/material";

interface DialogPanelProps {
  sx?: object;
  children?: React.ReactNode;
}

export const DialogPanel = ({
  sx: customStyle,
  children,
}: DialogPanelProps) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      margin: "1rem",
      ...customStyle,
    }}
  >
    {children}
  </Box>
);

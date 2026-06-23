import { Box } from "@mui/material";
const FormPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "backgroundPage",
        padding: "2rem",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      ></Box>
      {children}
    </Box>
  );
};

export default FormPage;

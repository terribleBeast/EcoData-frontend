import { Paper, Typography } from "@mui/material";
import { ClassifierDropdown } from "./ClassifierDropdown";

interface ClassifierMenuProps {
  onSelect: (index: number) => void;
}

export const ClassifierMenu = ({ onSelect }: ClassifierMenuProps) => (
  <Paper
    elevation={3}
    sx={(theme) => ({
      backgroundColor: theme.palette.surface,
      padding: "1rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      borderRadius: "8px",
      marginBottom: "2rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    })}
  >
    <Typography
      sx={{
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        fontWeight: 600,
      }}
    >
      Род
    </Typography>
    <ClassifierDropdown onSelect={onSelect} />
  </Paper>
);

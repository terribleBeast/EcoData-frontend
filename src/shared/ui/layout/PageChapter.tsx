import { Box, Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type PageChapterProps = {
  header:
    | { title: string; onCreate?: () => void }
    | { component: React.ReactNode };
  children: React.ReactNode;
};

export const PageChapter = ({ header, children }: PageChapterProps) => (
  <Paper
    elevation={3}
    sx={(theme) => ({
      backgroundColor: theme.palette.surface,
      padding: "1rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      borderRadius: "8px",
      marginBottom: "2rem",
      minHeight: "max-content",
      minWidth: "max-content",
    })}
  >
    {"component" in header ? (
      header.component
    ) : (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <Typography
          sx={(theme) => ({
            fontSize: "2.2rem",
            fontWeight: 600,
            color: theme.palette.secondary.main,
          })}
        >
          {header.title}
        </Typography>
        {header.onCreate && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={header.onCreate}
            sx={{ textTransform: "none" }}
          >
            Создать
          </Button>
        )}
      </Box>
    )}

    {children}
  </Paper>
);

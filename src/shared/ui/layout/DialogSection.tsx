import { Paper, Typography, Box } from "@mui/material";

export const DialogSection = ({
  title,
  children,
  width = "50%",
}: {
  title: string;
  children: React.ReactNode;
  width?: string;
}) => (
  <Paper
    elevation={3}
    sx={{
      width: width,
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    }}
  >
    <Typography
      sx={(theme) => ({
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        fontWeight: 600,
        color: theme.palette.secondary.main,
        textAlign: "center",
      })}
    >
      {title}
    </Typography>
    <Box>{children}</Box>
  </Paper>
);

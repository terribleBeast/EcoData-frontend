import { Typography } from "@mui/material";

export const ChapterHeaderTemplate = ({
  header,
}: {
  header: { title: string } | { component: React.ReactNode };
}) =>
  "title" in header ? (
    <Typography
      sx={(theme) => ({
        fontSize: "2.2rem",
        marginBottom: "1.5rem",
        fontWeight: 600,
        color: theme.palette.secondary.main,
        alignSelf: "center",
      })}
    >
      {header.title}
    </Typography>
  ) : (
    header.component
  );

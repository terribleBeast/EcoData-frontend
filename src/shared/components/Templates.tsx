import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { type IChapterData } from "@/shared/types";

export const ChapterHeaderTemplate = ({
  chapterTitle,
}: {
  chapterTitle: string;
}) => (
  <Typography
    sx={(theme) => ({
      fontSize: "2.2rem",
      marginBottom: "1.5rem",
      fontWeight: 600,
      color: theme.palette.secondary.main,
      alignSelf: "center",
    })}
  >
    {chapterTitle}
  </Typography>
);

export const ChapterContentTemplate = ({
  content,
}: {
  content: React.ReactNode;
}) => {
  return <Box>{content}</Box>;
};

export const ChapterInfoTemplate = ({
  chaptersInfo,
}: {
  chaptersInfo: IChapterData[];
}) => {
  if (chaptersInfo === null) return;

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
      {chaptersInfo.map((chapterData, index) => (
        <Card sx={{ marginBottom: "16px" }} key={chapterData.title + index}>
          <CardHeader title={chapterData.title} />
          <CardContent key={index}>
            {Array.isArray(chapterData.fields)
              ? chapterData.fields.map((field, index) => (
                  <Typography sx={{ fontWeight: "bold" }} key={index}>
                    {field.name}:{" "}
                    <Typography sx={{ display: "inline" }}>
                      {field.value}
                    </Typography>
                  </Typography>
                ))
              : chapterData.fields}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export const DialogChapters = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={3}
    sx={{
      width: "50%",
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
        alignSelf: "center",
      })}
    >
      {title}
    </Typography>
    <ChapterContentTemplate content={children} />
  </Paper>
);

export const Page = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    sx={(theme) => ({
      backgroundColor: theme.palette.backgroundPage,
      border: `1px solid ${theme.palette.border}`,
      borderRadius: "5px",
      height: "100%",
      width: "100%",
      margin: "1.5rem",
      padding: "1.5rem",
      display: "inline-block",
    })}
  >
    <Typography
      sx={(theme) => ({
        fontSize: "3rem",
        marginBottom: "2rem",
        color: theme.palette.primary.main,
      })}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export const PageChapter = ({
  title,
  headerComponent,
  children,
}: {
  title?: string;
  headerComponent?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={3}
    sx={(theme) => ({
      backgroundColor: theme.palette.surface,
      padding: "1rem",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      borderRadius: "8px",
      marginBottom: "2rem",
    })}
  >
    {headerComponent !== undefined ? (
      headerComponent
    ) : (
      <Typography
        sx={(theme) => ({
          fontSize: "2.2rem",
          marginBottom: "1.5rem",
          fontWeight: 600,
          color: theme.palette.secondary.main,
        })}
      >
        {title}
      </Typography>
    )}

    {children}
  </Paper>
);

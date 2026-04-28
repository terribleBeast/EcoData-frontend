import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export const ChapterHeaderTemplate = ({ chapterTitle }) => (
  <Typography className="chapter-title" style={{ alignSelf: "center" }}>
    {chapterTitle}
  </Typography>
);

export const ChapterContentTemplate = ({ content }) => {
  return <Box>{content}</Box>;
};

export const ChapterInfoTemplate = ({ chaptersInfo }) => {
  if (chaptersInfo === null) return;

  return (
    <Box style={{ overflowY: "auto", maxHeight: "60vh" }}>
      {chaptersInfo.map((chapterData, index) => (
        <Card style={{ marginBottom: "16px" }} key={chapterData.title + index}>
          <CardHeader title={chapterData.title} />
          <CardContent key={index}>
            {Array.isArray(chapterData.fields)
              ? chapterData.fields.map((field, index) => (
                  <Typography style={{ fontWeight: "bold" }} key={index}>
                    {field.name}:{" "}
                    <Typography style={{ display: "inline" }}>
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

export const DialogChapters = ({ title, children }) => (
  <Paper
    elevation={3}
    style={{
      width: "50%",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
    }}
  >
    <Typography className="chapter-title" style={{ alignSelf: "center" }}>
      {title}
    </Typography>
    <ChapterContentTemplate content={children} />
  </Paper>
);

export const Page = ({ title, children }) => (
  <Box className="page-layout">
    <Typography className="page-title">{title}</Typography>
    {children}
  </Box>
);

export const PageChapter = ({ title, headerComponent, children }) => (
  <Paper elevation={3} className="chapter">
    {headerComponent !== undefined ? (
      headerComponent
    ) : (
      <Typography className="chapter-title">{title}</Typography>
    )}

    {children}
  </Paper>
);

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { type IChapterData } from "@/shared/types";
import React from "react";

export const ChapterInfoTemplate = ({
  chaptersInfo,
}: {
  chaptersInfo: IChapterData[];
}) => {
  if (!chaptersInfo?.length) return null;

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "60vh" }}>
      {chaptersInfo.map((chapterData, index) => (
        <Card
          sx={{ margin: "2px", marginBottom: "16px" }}
          elevation={1}
          // variant="outlined"
          key={chapterData.title + index}
        >
          <CardHeader title={chapterData.title} />
          <CardContent>
            {Array.isArray(chapterData.fields) ? (
              <Grid
                container
                sx={{
                  "--Grid-borderWidth": "0.5px",
                  borderColor: "divider",
                  "& > div": {
                    borderBottom: "var(--Grid-borderWidth) solid",
                    borderColor: "divider",
                  },
                }}
              >
                {chapterData.fields.map((field, index) => (
                  <>
                    <Grid size={4} key={1 + index * 10}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {field.name}
                      </Typography>
                    </Grid>
                    <Grid size={8} key={index} sx={{ padding: "3px" }}>
                      <Typography>{field.value}</Typography>
                    </Grid>
                  </>
                ))}
              </Grid>
            ) : (
              chapterData.fields
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

import { Box } from "@mui/material";
import { useState } from "react";
import {
  ChapterContentTemplate,
  ChapterHeaderTemplate,
  ChapterInfoTemplate,
  PageChapter,
} from "@/shared/components/Templates";
import { classifiers, type IChapterData } from "@/shared/types";
import { ClassifierDropdown } from "./ClassifierDropdown";

export const ClassifiersChapter = () => {
  const chaptersInfo: IChapterData[] = [];
  for (let i = 0; i < classifiers.length; i++) {
    chaptersInfo.push({
      title: classifiers[i].plant,
      fields: [
        {
          name: "Сорта",
          value: classifiers[i].varieties.join(", "),
        },
      ],
    });
  }
  const [selectedGenus, setSelectedGenus] = useState([chaptersInfo[0]]);

  return (
    <PageChapter
      title={undefined}
      headerComponent={
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <ChapterHeaderTemplate chapterTitle={"Роды и сорта растений"} />
          <ClassifierDropdown
            onSelect={(classifier_index: number) =>
              setSelectedGenus([chaptersInfo[classifier_index]])
            }
          />
        </Box>
      }
    >
      <ChapterContentTemplate
        content={<ChapterInfoTemplate chaptersInfo={selectedGenus} />}
      />
    </PageChapter>
  );
};

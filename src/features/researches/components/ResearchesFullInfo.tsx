import {
  ChapterInfoTemplate,
  DialogChapters,
  DialogPanel,
} from "@/shared/components";
import type { IChapterData } from "@/shared/types";
import { Box, Card, Link, List, ListItemButton } from "@mui/material";
import { ResultTable } from "./PredictionResultTable";
import type { ISelectedResearch } from "../types";

export const ResearchFullInfo = ({
  research,
}: {
  research: ISelectedResearch | null;
}) => {
  if (research === null) return;

  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        { name: "Название", value: research.title },
        { name: "Цель", value: research.goal },
        { name: "Статус", value: research.status },
      ],
    },
    {
      title: "Участники",
      fields: (
        <Box sx={{ overflowY: "auto", maxHeight: "20vh" }}>
          <List>
            {research.researchers.map((researcher, index) => (
              <ListItemButton
                key={index}
                href={`/researchers?researcher_id=${researcher.id}`}
              >
                {index + 1}.&nbsp;
                <Link>
                  {researcher.surname} {researcher.name[0]}.{" "}
                  {researcher.patronymic[0]}.
                </Link>
              </ListItemButton>
            ))}{" "}
          </List>
        </Box>
      ),
    },
  ];

  return (
    <DialogPanel>
      <DialogChapters title="Таблица результатов">
        <Card sx={{ overflowY: "auto", overflowX: "auto", maxHeight: "60vh" }}>
          <ResultTable data={research.results} isLoading={false} />
        </Card>
      </DialogChapters>
      <DialogChapters title="Данные об исследовании">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogChapters>
    </DialogPanel>
  );
};

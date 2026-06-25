import { DialogPanel } from "@/shared/components";
import type { IChapterData } from "@/shared/types";
import { Box, Button, Card, Typography } from "@mui/material";
import { ResultTable } from "./PredictionResultTable";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";
import type {
  IPredictionTable,
  IResearchDataFull,
} from "@/shared/types/research";
import type { IResearcherData } from "@/shared/types/researcher";
import { ResearchersList } from "./ResearchersList";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { selectResearcher } from "@/features/user/authSlice";

export const ResearchFullInfo = ({
  research,
  researchersQuery,
  onJoinResearch,
  onLeaveResearch,
  predictionQuery,
}: {
  research: IResearchDataFull;
  researchersQuery?: {
    data?: IResearcherData[];
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
  onJoinResearch: () => void;
  onLeaveResearch: () => void;
  predictionQuery: {
    data?: IPredictionTable;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  const currentResearcher = useSelector(selectResearcher);

  const isParticipant =
    currentResearcher &&
    researchersQuery?.data?.some(
      (r) => r.researcher_id === currentResearcher.researcher_id,
    );

  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        { name: "Название", value: research.title },
        { name: "Цель", value: research.goal ?? "—" },
        { name: "Статус", value: research.status },
      ],
    },
    {
      title: "Участники",
      fields: (
        <>
          <Box
            sx={{ overflowY: "auto", maxHeight: "20vh", padding: 0, margin: 0 }}
          >
            <ResearchersList researchersQuery={researchersQuery} />
          </Box>

          {currentResearcher &&
            (!isParticipant ? (
              <Button
                color="success"
                variant="outlined"
                sx={{ marginTop: "1rem", width: "100%" }}
                onClick={onJoinResearch}
              >
                <Typography>Присоединиться</Typography>
              </Button>
            ) : (
              <Button
                color="error"
                variant="outlined"
                sx={{ width: "100%", marginTop: "1rem" }}
                onClick={onLeaveResearch}
              >
                <Typography>Покинуть</Typography>
              </Button>
            ))}
        </>
      ),
    },
  ];

  return (
    <DialogPanel>
      <DialogSection title="Таблица результатов" width="70%">
        <Card sx={{ overflowY: "auto", overflowX: "auto", maxHeight: "60vh" }}>
          <ResultTable predictionQuery={predictionQuery} />
        </Card>
      </DialogSection>
      <DialogSection title="Сведения" width="30%">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogSection>
    </DialogPanel>
  );
};

import { DialogPanel } from "@/shared/components";
import type { IChapterData } from "@/shared/types";
import { Box, Button, Card, Typography } from "@mui/material";
import { ResultTable } from "./PredictionResultTable";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/features/user/authSlice";
import type {
  IPredictionTable,
  IResearchDataFull,
} from "@/shared/types/research";
import type { IResearcherData } from "@/shared/types/researcher";
import { ResearchersList } from "./ResearchersList";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const ResearchFullInfo = ({
  research,
  researchersQuery,
  handleAddUserToResearch,
  predictionQuery,
}: {
  handleAddUserToResearch: (data: IResearchDataFull) => void;
  research: IResearchDataFull;
  researchersQuery: {
    data?: IResearcherData[];
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
  predictionQuery: {
    data?: IPredictionTable;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  const user_id = useSelector(selectUserInfo)?.id;
  const isParticipant = user_id
    ? research.researchers_id.includes(user_id)
    : false;
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
        <>
          <Box
            sx={{ overflowY: "auto", maxHeight: "20vh", padding: 0, margin: 0 }}
          >
            <ResearchersList researchersQuery={researchersQuery} />
          </Box>
          {user_id &&
            (!isParticipant ? (
              <Button
                color="success"
                variant="outlined"
                sx={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                onClick={() =>
                  handleAddUserToResearch({
                    ...research,
                    researchers_id: [...research.researchers_id, user_id],
                  })
                }
              >
                <Typography>Присоединиться</Typography>
              </Button>
            ) : (
              <Button
                color="error"
                variant="outlined"
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onClick={() =>
                  handleAddUserToResearch({
                    ...research,
                    researchers_id: research.researchers_id.filter(
                      (r_id) => r_id !== user_id,
                    ),
                  })
                }
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

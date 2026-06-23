import { Card, Typography } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";
import type { IResearchData } from "@/shared/types/research";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { ResearchesList } from "./ResearchesList";

const checkNull = (field: string | undefined) =>
  field ? field : <Typography sx={{ fontStyle: "italic" }}> Нет </Typography>;

export const ResearcherFullInfo = ({
  researcher,
  researchesQuery,
}: {
  researcher: IResearcherDataFull;
  researchesQuery: {
    data?: IResearchData[];
    isLoading: boolean;
    isError: boolean;
  };
}) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Фамилия",
          value: researcher.surname,
        },
        {
          name: "Имя",
          value: researcher.name,
        },
        {
          name: "Отчество",
          value: researcher.patronymic,
        },
        {
          name: "Работа",
          value: checkNull(researcher.job),
        },
      ],
    },
    {
      title: "Контактная информация",
      fields: [
        {
          name: "e-mail",
          value: researcher.email,
        },
        {
          name: "Телефон",
          value: checkNull(researcher.phoneNumber),
        },
      ],
    },
  ];
  return (
    <DialogPanel>
      <DialogSection title={"Исследования"}>
        <Card sx={{ overflowY: "auto", maxHeight: "60vh" }}>
          <ResearchesList researchesQuery={researchesQuery} />
        </Card>
      </DialogSection>
      <DialogSection title="Профиль исследователя">
        <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
      </DialogSection>
    </DialogPanel>
  );
};

import { Card } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";
import type { IResearchData } from "@/shared/types/research";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { ResearchesList } from "./ResearchesList";
import { checkNull, checkNullName } from "@/shared/utils";

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
  console.log(researcher);
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Фамилия",
          value: researcher.last_name,
        },
        {
          name: "Имя",
          value: researcher.first_name,
        },
        {
          name: "Отчество",
          value: checkNull(researcher.patronymic ?? null),
        },
        {
          name: "Работа",
          value: checkNullName(researcher.job),
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
          value: checkNull(researcher.phone),
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

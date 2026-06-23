import { Card } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";
import { LoadingState } from "@/shared/components";
import { QueryErrorState } from "@/shared/ui/states/ErrorState";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type {
  IPlantDataFull,
  IPlantDescriptionFull,
} from "@/shared/types/plant";

export const PlantFullInfo = ({
  plant,
  descriptionQuery,
}: {
  plant: IPlantDataFull;
  descriptionQuery: {
    data?: IPlantDescriptionFull;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Род",
          value: descriptionQuery.data?.genus.name ?? "—",
        },
        {
          name: "Вид",
          value: descriptionQuery.data?.species.name ?? "—",
        },
        {
          name: "Тип листа",
          value: descriptionQuery.data?.leaf_type.name ?? "—",
        },
        {
          name: "Жизненная форма",
          value: descriptionQuery.data?.life_form.name ?? "—",
        },
      ],
    },
    {
      title: "Описание",
      fields: [
        {
          name: "Описание",
          value: descriptionQuery.data?.description ?? plant.additional_info,
        },
      ],
    },
  ];

  if (descriptionQuery.isLoading) {
    return <LoadingState />;
  }

  if (descriptionQuery.isError) {
    return <QueryErrorState error={descriptionQuery.error} />;
  }

  return (
    <DialogPanel>
      <DialogSection title="Информация о растении" width="100%">
        <Card sx={{ padding: "1rem" }}>
          <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
        </Card>
      </DialogSection>
    </DialogPanel>
  );
};

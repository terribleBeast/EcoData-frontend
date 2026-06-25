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
  PlantDescriptionNested,
} from "@/shared/types/plant";

export const PlantFullInfo = ({
  plant,
  descriptionQuery,
}: {
  plant: IPlantDataFull;
  descriptionQuery: {
    data?: PlantDescriptionNested | null;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  const desc = descriptionQuery.data ?? plant.plant_description;

  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Вид",
          value:
            desc?.species?.latin_name ?? desc?.species?.russian_name ?? "—",
        },
        {
          name: "Тип листа",
          value: desc?.leaf_blade_type?.name ?? "—",
        },
        {
          name: "Жизненная форма",
          value: desc?.plant_life_form?.name ?? "—",
        },
      ],
    },
    {
      title: "Описание",
      fields: [
        {
          name: "Описание",
          value: desc?.description ?? plant.description ?? "—",
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

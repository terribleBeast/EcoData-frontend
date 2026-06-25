import { Card } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import type { ILabDataFull } from "@/shared/types/lab";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const LabFullInfo = ({ lab }: { lab: ILabDataFull }) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        {
          name: "Название",
          value: lab.name ?? "—",
        },
        {
          name: "Организация",
          value: lab.organization?.name ?? "—",
        },
        {
          name: "Адрес",
          value: lab.address?.address_id ?? "—",
        },
      ],
    },
  ];

  return (
    <DialogPanel>
      <DialogSection title="Информация о лаборатории" width="100%">
        <Card sx={{ padding: "1rem" }}>
          <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
        </Card>
      </DialogSection>
    </DialogPanel>
  );
};

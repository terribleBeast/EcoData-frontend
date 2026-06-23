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
          value: lab.organization_details?.name ?? "—",
        },
        {
          name: "Email",
          value: lab.organization_details?.email ?? "—",
        },
        {
          name: "Телефон",
          value: lab.organization_details?.phone ?? "—",
        },
        {
          name: "Тип организации",
          value: lab.organization_type?.name ?? "—",
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

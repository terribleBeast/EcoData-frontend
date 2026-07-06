import { Card } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import type { IAddressDataFull } from "../types";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const AddressFullInfo = ({ address }: { address: IAddressDataFull }) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Адрес",
      fields: [
        {
          name: "ID адреса",
          value: address.id ?? "—",
        },
        {
          name: "Населённый пункт (ID)",
          value: address.settlement_id ?? "—",
        },
        {
          name: "Улица (ID)",
          value: address.street_id ?? "—",
        },
        {
          name: "Дом (ID)",
          value: address.house_number_id ?? "—",
        },
      ],
    },
  ];

  return (
    <DialogPanel>
      <DialogSection title="Информация об адресе" width="100%">
        <Card sx={{ padding: "1rem" }}>
          <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
        </Card>
      </DialogSection>
    </DialogPanel>
  );
};

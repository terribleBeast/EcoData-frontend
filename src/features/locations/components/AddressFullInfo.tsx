import { Card } from "@mui/material";
import { DialogPanel } from "@/shared/components/DialogPanel";
import type { IChapterData } from "@/shared/types";
import type { IAddressDataFull } from "@/shared/types/location";
import { DialogSection } from "@/shared/ui/layout";
import { ChapterInfoTemplate } from "@/shared/ui/ChapterInfoTemplate";

export const AddressFullInfo = ({ address }: { address: IAddressDataFull }) => {
  const chaptersInfo: IChapterData[] = [
    {
      title: "Адрес",
      fields: [
        {
          name: "Страна",
          value: address.settlement?.district?.region?.country?.name ?? "—",
        },
        {
          name: "Регион",
          value: address.settlement?.district?.region?.name ?? "—",
        },
        {
          name: "Район",
          value: address.settlement?.district?.name ?? "—",
        },
        {
          name: "Населённый пункт",
          value: address.settlement?.name ?? "—",
        },
        {
          name: "Тип нас. пункта",
          value: address.settlement?.settlement_type?.name ?? "—",
        },
        {
          name: "Улица",
          value: address.street?.name ?? "—",
        },
        {
          name: "Дом",
          value: address.house_number?.number ?? "—",
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

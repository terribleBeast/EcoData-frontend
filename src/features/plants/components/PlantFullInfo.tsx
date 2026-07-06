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
  IGenus,
  ILocation,
  IPlantDataFull,
  IPlantDescriptionFull,
  ISpecies,
} from "@/shared/types/plant";
import { useGetAllSpeciesQuery, useGetGeneraQuery } from "@/api/endpoints";
import { useMemo } from "react";
import { PlantLeavesList } from "./PlantLeavesList";

const taxonLabel = (item?: IGenus | ISpecies | null) =>
  item
    ? item.russian_name
      ? `${item.latin_name} (${item.russian_name})`
      : item.latin_name
    : "—";

const locationLabel = (location?: ILocation | null) =>
  location
    ? location.description ||
      [location.latitude, location.longitude].filter(Boolean).join(", ") ||
      location.id
    : "—";

export const PlantFullInfo = ({
  plant,
  descriptionQuery,
}: {
  plant: IPlantDataFull;
  descriptionQuery: {
    data?: IPlantDescriptionFull | null;
    isLoading: boolean;
    isError: boolean;
    error?: FetchBaseQueryError | SerializedError;
  };
}) => {
  const { data: allSpecies = [] } = useGetAllSpeciesQuery();
  const { data: genera = [] } = useGetGeneraQuery();

  const speciesById = useMemo(
    () => new Map(allSpecies.map((item) => [item.id, item])),
    [allSpecies],
  );

  const genusById = useMemo(
    () => new Map(genera.map((item) => [item.id, item])),
    [genera],
  );

  const description = descriptionQuery.data;

  const nestedSpecies = description?.species ?? null;

  const fullSpecies = nestedSpecies?.id
    ? (speciesById.get(nestedSpecies.id) ?? nestedSpecies)
    : description?.species_id
      ? (speciesById.get(description.species_id) ?? null)
      : null;

  const species = fullSpecies ?? nestedSpecies;

  const genus =
    description?.genus ??
    nestedSpecies?.genus ??
    fullSpecies?.genus ??
    genusById.get(fullSpecies?.genus_id ?? nestedSpecies?.genus_id ?? "") ??
    null;
  const chaptersInfo: IChapterData[] = [
    {
      title: "Общая информация",
      fields: [
        { name: "Род", value: genus ? taxonLabel(genus) : "—" },
        { name: "Вид", value: species ? taxonLabel(species) : "—" },
        {
          name: "Тип листовой пластинки",
          value: descriptionQuery.data?.leaf_blade_type?.name ?? "—",
        },
        {
          name: "Жизненная форма",
          value: descriptionQuery.data?.plant_life_form?.name ?? "—",
        },
        { name: "Локация", value: locationLabel(plant.location) },
      ],
    },
    {
      title: "Описание",
      fields: [
        {
          name: "Описание растения",
          value: descriptionQuery.data?.description ?? "—",
        },
        {
          name: "Дополнительная информация",
          value: plant.description ?? "—",
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
  console.log(plant);
  return (
    <DialogPanel>
      <DialogSection title="Листья растения" width="70%">
        <Card sx={{ overflowY: "auto", overflowX: "auto", maxHeight: "60vh" }}>
          <PlantLeavesList leaves={plant.leaves ?? []} />
        </Card>
      </DialogSection>
      <DialogSection title="Информация о растении" width="30%">
        <Card sx={{ padding: "1rem" }}>
          <ChapterInfoTemplate chaptersInfo={chaptersInfo} />
        </Card>
      </DialogSection>
    </DialogPanel>
  );
};

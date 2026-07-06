import { DataTable } from "@/shared/components/DataTable";
import { usePlantsCrud } from "../hooks/usePlantsState";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type {
  IGenus,
  ILocation,
  IPlantDataFull,
  ISpecies,
} from "@/shared/types/plant";
import { PageChapter } from "@/shared/ui/layout";
import { useGetAllSpeciesQuery } from "@/api/endpoints";
import { useMemo } from "react";

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

interface PlantMeta {
  onEdit: (row: IPlantDataFull) => void;
  onDelete: (plant_id: string) => void;
}

const PlantsPage = () => {
  const { items: plants, remove, queriesState } = usePlantsCrud();
  const navigate = useNavigate();

  const { data: allSpecies = [] } = useGetAllSpeciesQuery();
  const speciesById = useMemo(
    () => new Map(allSpecies.map((item) => [item.id, item])),
    [allSpecies],
  );

  const plantColumns: MRT_ColumnDef<IPlantDataFull>[] = [
    {
      id: "genus",
      header: "Род",
      accessorFn: (row) => {
        const rowSpecies = row.plant_description?.species;
        const fullSpecies = rowSpecies?.id
          ? (speciesById.get(rowSpecies.id) ?? rowSpecies)
          : null;
        return taxonLabel(
          row.plant_description?.genus ?? fullSpecies?.genus ?? null,
        );
      },
    },
    {
      id: "species",
      header: "Вид",
      accessorFn: (row) => taxonLabel(row.plant_description?.species),
    },
    {
      id: "location",
      header: "Локация",
      accessorFn: (row) => locationLabel(row.location),
    },
    {
      accessorKey: "description",
      header: "Описание",
      Cell: ({ cell }) => cell.getValue<string | null>() || "—",
    },

    {
      id: "actions",
      header: "",
      size: 100,
      grow: false,
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row, table }) => {
        const meta = table.options.meta as PlantMeta | undefined;
        return (
          <>
            <IconButton
              size="small"
              aria-label="Редактировать"
              onClick={(e) => {
                e.stopPropagation();
                meta?.onEdit(row.original);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Удалить"
              onClick={(e) => {
                e.stopPropagation();
                meta?.onDelete(row.original.id);
              }}
            >
              <Delete color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <PageChapter
      header={{
        title: "Таблица растений",
        onCreate: () => navigate("/plants/new"),
      }}
    >
      <DataTable
        columns={plantColumns}
        data={plants}
        isLoading={queriesState.list.isLoading}
        onRowClick={(row) => navigate(`/plants/${row.id}`)}
        meta={{
          onEdit: (plant: IPlantDataFull) =>
            navigate(`/plants/${plant.id}/edit`),
          onDelete: (plant_id: string) => {
            remove(plant_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default PlantsPage;

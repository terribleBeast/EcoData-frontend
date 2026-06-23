import { DataTable } from "@/shared/components/DataTable";
import { usePlantsCrud } from "../hooks/usePlantsState";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { IPlantDataFull } from "@/shared/types/plant";
import { PageChapter } from "@/shared/ui/layout";

interface PlantMeta {
  onEdit: (row: IPlantDataFull) => void;
  onDelete: (plant_id: number) => void;
}

const plantColumns: MRT_ColumnDef<IPlantDataFull>[] = [
  {
    accessorKey: "genus",
    header: "Род",
    Cell: ({ row }) => (
      <Typography sx={{ cursor: "pointer" }}>
        {row.original.plant_description?.genus?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "species",
    header: "Вид",
    Cell: ({ row }) => (
      <Typography>
        {row.original.plant_description?.species?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "leaf_type",
    header: "Тип листа",
    Cell: ({ row }) => (
      <Typography>
        {row.original.plant_description?.leaf_type?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "life_form",
    header: "Жизненная форма",
    Cell: ({ row }) => (
      <Typography>
        {row.original.plant_description?.life_form?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "additional_info",
    header: "Доп. информация",
    Cell: ({ row }) => (
      <Typography>{row.original.additional_info || "—"}</Typography>
    ),
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

const PlantsPage = () => {
  const { items: plants, remove, queriesState } = usePlantsCrud();
  const navigate = useNavigate();

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
          onDelete: (plant_id: number) => {
            remove(plant_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default PlantsPage;

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
  onDelete: (plant_id: string) => void;
}

const plantColumns: MRT_ColumnDef<IPlantDataFull>[] = [
  {
    accessorKey: "description",
    header: "Описание",
    Cell: ({ row }) => (
      <Typography>{row.original.description || "—"}</Typography>
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
              meta?.onDelete(row.original.plant_id);
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
        onRowClick={(row) => navigate(`/plants/${row.plant_id}`)}
        meta={{
          onEdit: (plant: IPlantDataFull) =>
            navigate(`/plants/${plant.plant_id}/edit`),
          onDelete: (plant_id: string) => {
            remove(plant_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default PlantsPage;

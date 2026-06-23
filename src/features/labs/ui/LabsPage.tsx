import { DataTable } from "@/shared/components/DataTable";
import { useLabsCrud } from "../hooks/useLabsState";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { ILabDataFull } from "@/shared/types/lab";
import { PageChapter } from "@/shared/ui/layout";

interface LabMeta {
  onEdit: (row: ILabDataFull) => void;
  onDelete: (lab_id: number) => void;
}

const labColumns: MRT_ColumnDef<ILabDataFull>[] = [
  {
    accessorKey: "name",
    header: "Название",
    Cell: ({ row }) => (
      <Typography sx={{ cursor: "pointer" }}>
        {row.original.organization_details?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    Cell: ({ row }) => (
      <Typography>{row.original.organization_details?.email ?? "—"}</Typography>
    ),
  },
  {
    accessorKey: "type",
    header: "Тип",
    Cell: ({ row }) => (
      <Typography>{row.original.organization_type?.name ?? "—"}</Typography>
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
      const meta = table.options.meta as LabMeta | undefined;
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

const LabsPage = () => {
  const { items: labs, remove, queriesState } = useLabsCrud();
  const navigate = useNavigate();

  return (
    <PageChapter
      header={{
        title: "Таблица лабораторий",
        onCreate: () => navigate("/laboratories/new"),
      }}
    >
      <DataTable
        columns={labColumns}
        data={labs}
        isLoading={queriesState.list.isLoading}
        onRowClick={(row) => navigate(`/laboratories/${row.id}`)}
        meta={{
          onEdit: (lab: ILabDataFull) =>
            navigate(`/laboratories/${lab.id}/edit`),
          onDelete: (lab_id: number) => {
            remove(lab_id);
          },
        }}
      />
    </PageChapter>
  );
};

export default LabsPage;

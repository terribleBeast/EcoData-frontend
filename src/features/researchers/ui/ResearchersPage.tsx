import { DataTable } from "@/shared/components/DataTable";
import { useResearchersCrud } from "../hooks/useResearchersCrud";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { IResearcherDataFull } from "@/shared/types/researcher";
import { PageChapter } from "@/shared/ui/layout";

interface ResearcherMeta {
  onEdit: (row: IResearcherDataFull) => void;
  onDelete: (researcher_id: number) => void;
}

const researcherColumns: MRT_ColumnDef<IResearcherDataFull>[] = [
  {
    accessorKey: "fullName",
    header: "ФИО",
    Cell: ({ row }) => (
      <Typography sx={{ cursor: "pointer" }}>
        {row.original.surname} {row.original.name[0]}.{" "}
        {row.original.patronymic[0]}.
      </Typography>
    ),
  },
  {
    accessorKey: "email",
    header: "e-mail",
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
  {
    accessorKey: "job",
    header: "Работа",
  },
  {
    accessorKey: "researches",
    header: "Количество исследований",
    accessorFn: (row) => (row.researches_id ? row.researches_id.length : 0),
  },
  {
    id: "actions",
    header: "",
    size: 100,
    grow: false,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row, table }) => {
      const meta = table.options.meta as ResearcherMeta | undefined;
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

const ResearchersPage = () => {
  const { items: researchers, remove, queriesState } = useResearchersCrud();
  const navigate = useNavigate();

  return (
    <PageChapter
      header={{
        title: "Таблица исследователей",
        onCreate: () => navigate("/researchers/new"),
      }}
    >
      <DataTable
        columns={researcherColumns}
        data={researchers}
        isLoading={queriesState.list.isLoading}
        onRowClick={(row) => navigate(`/researchers/${row.id}`)}
        meta={{
          onEdit: (researcher: IResearcherDataFull) =>
            navigate(`/researchers/${researcher.id}/edit`),
          onDelete: (researcher_id: number) => {
            remove(researcher_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default ResearchersPage;

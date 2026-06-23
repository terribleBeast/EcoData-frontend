import { DataTable } from "@/shared/components/DataTable";
import { useResearchesCrud } from "../hooks/useResearchesCrud";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { IResearchDataFull } from "@/shared/types/research";
import { PageChapter } from "@/shared/ui/layout";

interface ResearchMeta {
  onEdit: (row: IResearchDataFull) => void;
  onDelete: (research_id: number) => void;
}

const researchColumns: MRT_ColumnDef<IResearchDataFull>[] = [
  {
    accessorKey: "title",
    header: "Название",
    Cell: ({ row }) => (
      <Typography sx={{ cursor: "pointer" }}>{row.original.title}</Typography>
    ),
  },
  {
    accessorKey: "goal",
    header: "Цель",
  },
  {
    accessorKey: "startDate",
    header: "Дата начала",
  },
  {
    accessorKey: "endDate",
    header: "Дата окончания",
  },
  {
    accessorKey: "status",
    header: "Статус",
  },
  {
    id: "actions",
    header: "",
    size: 100,
    grow: false,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row, table }) => {
      const meta = table.options.meta as ResearchMeta | undefined;
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

const ResearchesPage = () => {
  const { items: researches, remove, queriesState } = useResearchesCrud();
  const navigate = useNavigate();

  return (
    <PageChapter
      header={{
        title: "Таблица исследований",
        onCreate: () => navigate("/researches/new"),
      }}
    >
      <DataTable
        columns={researchColumns}
        data={researches}
        isLoading={queriesState.list.isLoading}
        onRowClick={(row) => navigate(`/researches/${row.id}`)}
        meta={{
          onEdit: (research: IResearchDataFull) =>
            navigate(`/researches/${research.id}/edit`),
          onDelete: (research_id: number) => {
            remove(research_id);
          },
        }}
      />
    </PageChapter>
  );
};

export default ResearchesPage;

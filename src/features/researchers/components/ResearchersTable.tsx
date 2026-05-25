import { Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import type { IResearcherDataFull } from "@/shared/types/researcher";

export const ResearchersTable = ({
  data,
  handleSelectResearcher,
  isLoading,
}: {
  data: IResearcherDataFull[];
  handleSelectResearcher: (researcher: IResearcherDataFull) => void;
  isLoading: boolean;
}) => {
  const columns: MRT_ColumnDef<IResearcherDataFull>[] = [
    {
      accessorKey: "id",
      header: "№",
      accessorFn: (dataRow) => dataRow.id + 1,
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "fullName",
      header: "ФИО",
      Cell: ({ row }) => (
        <Typography
          onClick={() => handleSelectResearcher(row.original)}
          sx={{ cursor: "pointer" }}
        >
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
      header: "Статус",
    },
    {
      accessorKey: "job",
      header: "Работа",
    },
    {
      accessorKey: "researches",
      header: "Количество исследований",
      Cell: ({ row }) => (
        <Typography>{row.original.researches_id.length}</Typography>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    state: {
      isLoading,
    },
  });
  console.log("Table");
  return <MaterialReactTable table={table} />;
};

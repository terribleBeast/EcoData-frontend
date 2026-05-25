import { Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
} from "material-react-table";
import type { IResearchDataFull } from "@/shared/types/research";

export const ResearchesTable = ({
  data,
  handleSelectResearch,
  isLoading: isLoadingResearchers,
}: {
  data: IResearchDataFull[];
  handleSelectResearch: (research: IResearchDataFull) => void;
  isLoading: boolean;
}) => {
  console.log("Researches", data);
  const columns: MRT_ColumnDef<IResearchDataFull>[] = [
    {
      accessorKey: "id",
      header: "№",
      accessorFn: (dataRow: MRT_RowData) => dataRow.id + 1,
      minSize: 50,
      size: 70,
      maxSize: 100,
      grow: false,
      enableEditing: false,
    },
    {
      accessorKey: "title",
      header: "Название",
      Cell: ({ row }) => (
        <Typography
          onClick={() => handleSelectResearch(row.original)}
          sx={{ cursor: "pointer" }}
        >
          {row.original.title}
        </Typography>
      ),
    },
    {
      accessorKey: "goal",
      header: "Цель",
    },
    {
      accessorKey: "startDate",
      header: "Дата начала",
      Cell: ({ row }) => row.original.startDate.toString(),
    },
    {
      accessorKey: "endDate",
      header: "Дата окончания",
      Cell: ({ row }) => row.original.endDate.toString(),
    },
    {
      accessorKey: "status",
      header: "Статус",
    },
    // {
    //   accessorKey: "researchers_id",
    //   header: "Исследователи",
    //   Cell: ({ row }) => (
    //     <Box sx={{ overflowY: "auto", maxHeight: "20vh" }}>
    //       <List>
    //         {row.original.researchers_id.map((item, index) => (
    //           <ListItemButton
    //             key={index}
    //             href={`/researchers?researcher_id=${researches[item].id}`}
    //           >
    //             {index + 1}.&nbsp;
    //             <Link>
    //               {researches[item].surname} {researches[item].name[0]}.{" "}
    //               {researches[item].patronymic[0]}.
    //             </Link>
    //           </ListItemButton>
    //         ))}
    //       </List>
    //     </Box>
    //   ),
    // },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: isLoadingResearchers,
    },
  });
  return <MaterialReactTable table={table} />;
};

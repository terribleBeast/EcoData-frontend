import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_TableOptions,
} from "material-react-table";

export type DataTableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading: boolean;
  onRowClick: (row: T) => void;
  meta?: MRT_TableOptions<T>["meta"];
};

export const DataTable = <T extends MRT_RowData>({
  columns,
  data,
  isLoading,
  onRowClick,
  meta,
}: DataTableProps<T>) => {
  const table = useMaterialReactTable({
    columns,
    data,
    meta,
    enableRowNumbers: true,

    state: {
      isLoading,
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => onRowClick(row.original),
      sx: { cursor: "pointer" },
    }),
  });

  return <MaterialReactTable table={table} />;
};

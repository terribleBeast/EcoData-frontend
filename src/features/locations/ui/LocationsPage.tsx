import { DataTable } from "@/shared/components/DataTable";
import { useLocationsCrud } from "../hooks/useLocationsState";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { IAddressDataFull } from "../types";
import { PageChapter } from "@/shared/ui/layout";

interface AddressMeta {
  onEdit: (row: IAddressDataFull) => void;
  onDelete: (address_id: string) => void;
}

const addressColumns: MRT_ColumnDef<IAddressDataFull>[] = [
  {
    accessorKey: "settlement_id",
    header: "Нас. пункт",
    Cell: ({ row }) => <Typography>{row.original.settlement_id}</Typography>,
  },
  {
    accessorKey: "street_id",
    header: "Улица",
    Cell: ({ row }) => <Typography>{row.original.street_id}</Typography>,
  },
  {
    accessorKey: "house_number_id",
    header: "Дом",
    Cell: ({ row }) => <Typography>{row.original.house_number_id}</Typography>,
  },
  {
    id: "actions",
    header: "",
    size: 100,
    grow: false,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row, table }) => {
      const meta = table.options.meta as AddressMeta | undefined;
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

const LocationsPage = () => {
  const { items: addresses, remove, queriesState } = useLocationsCrud();
  const navigate = useNavigate();

  return (
    <PageChapter
      header={{
        title: "Таблица адресов",
        onCreate: () => navigate("/locations/new"),
      }}
    >
      <DataTable
        columns={addressColumns}
        data={addresses}
        isLoading={queriesState.list.isLoading}
        onRowClick={(row) => navigate(`/locations/${row.id}`)}
        meta={{
          onEdit: (address: IAddressDataFull) =>
            navigate(`/locations/${address.id}/edit`),
          onDelete: (address_id: string) => {
            remove(address_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default LocationsPage;

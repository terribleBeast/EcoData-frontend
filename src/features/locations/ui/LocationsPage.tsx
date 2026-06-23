import { DataTable } from "@/shared/components/DataTable";
import { useLocationsCrud } from "../hooks/useLocationsState";
import { useNavigate } from "react-router";
import { IconButton, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { MRT_ColumnDef } from "material-react-table";
import type { IAddressDataFull } from "@/shared/types/location";
import { PageChapter } from "@/shared/ui/layout";

interface AddressMeta {
  onEdit: (row: IAddressDataFull) => void;
  onDelete: (address_id: number) => void;
}

const addressColumns: MRT_ColumnDef<IAddressDataFull>[] = [
  {
    accessorKey: "country",
    header: "Страна",
    Cell: ({ row }) => (
      <Typography sx={{ cursor: "pointer" }}>
        {row.original.settlement?.district?.region?.country?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "region",
    header: "Регион",
    Cell: ({ row }) => (
      <Typography>
        {row.original.settlement?.district?.region?.name ?? "—"}
      </Typography>
    ),
  },
  {
    accessorKey: "settlement",
    header: "Нас. пункт",
    Cell: ({ row }) => (
      <Typography>{row.original.settlement?.name ?? "—"}</Typography>
    ),
  },
  {
    accessorKey: "street",
    header: "Улица",
    Cell: ({ row }) => (
      <Typography>{row.original.street?.name ?? "—"}</Typography>
    ),
  },
  {
    accessorKey: "house",
    header: "Дом",
    Cell: ({ row }) => (
      <Typography>{row.original.house_number?.number ?? "—"}</Typography>
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
          onDelete: (address_id: number) => {
            remove(address_id);
          },
        }}
      />
    </PageChapter>
  );
};
export default LocationsPage;

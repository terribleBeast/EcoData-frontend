import { type MRT_RowData, type MRT_ColumnDef } from "material-react-table";

export type DataPageProps<TListItem extends MRT_RowData, TDetail> = {
  /** Title displayed in the PageChapter header */
  title: string;

  /** Table rows */
  items: TListItem[];

  /** Whether the table data is loading */
  isLoading: boolean;

  /** The currently selected detail item, or null if dialog is closed */
  selectedItem: TDetail | null;

  /** Called when a table row is clicked */
  onSelectItem: (item: TListItem) => void;

  /** Called when the detail dialog is closed */
  onCloseDetail: () => void;

  /** MaterialReactTable column definitions for the table */
  columns: MRT_ColumnDef<TListItem>[];

  /** Renders the content inside the detail dialog */
  detailRenderer: (item: TDetail) => React.ReactNode;

  /** Optional maxWidth for the detail dialog. Defaults to "xl". */
  dialogMaxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

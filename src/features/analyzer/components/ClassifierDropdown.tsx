import { Autocomplete, TextField } from "@mui/material";
import type { IGenus } from "@/shared/types";

type GenusLike = IGenus & {
  id?: string;
  genus_id?: string;
};

type Props = {
  value: GenusLike | undefined;
  options: GenusLike[];
  loading?: boolean;
  onSelect: (genus: GenusLike | null) => void | Promise<void>;
};

const getGenusId = (genus: GenusLike | null | undefined) => {
  return genus?.id ?? genus?.genus_id;
};

export const ClassifierDropdown = ({
  value,
  options,
  loading = false,
  onSelect,
}: Props) => {
  return (
    <Autocomplete
      value={value ?? null}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.russian_name ?? ""}
      isOptionEqualToValue={(option, selected) =>
        getGenusId(option) === getGenusId(selected)
      }
      onChange={(_, selectedOption) => {
        console.log("AUTOCOMPLETE CHANGE:", selectedOption);
        void onSelect(selectedOption);
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Введите род" />
      )}
    />
  );
};

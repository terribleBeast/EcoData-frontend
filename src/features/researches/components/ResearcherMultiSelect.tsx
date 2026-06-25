import { Autocomplete, TextField } from "@mui/material";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { IResearcherData } from "@/shared/types/researcher";
import { useMemo } from "react";

interface IResearcherMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  researchers: IResearcherData[];
  isLoading: boolean;
  label?: string;
  disabled?: boolean;
}

export const ResearcherMultiSelect = <T extends FieldValues>({
  name,
  control,
  researchers,
  isLoading,
  label = "Исследователи",
  disabled = false,
}: IResearcherMultiSelectProps<T>) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const selectedIds = useMemo(
    () => new Set(Array.isArray(value) ? (value as string[]) : []),
    [value],
  );

  const selected = useMemo(
    () => researchers.filter((r) => selectedIds.has(r.researcher_id)),
    [researchers, selectedIds],
  );

  return (
    <Autocomplete
      multiple
      options={researchers}
      getOptionLabel={(option) =>
        `${option.last_name} ${option.first_name[0]}.`
      }
      getOptionKey={(option) => option.researcher_id}
      value={selected}
      loading={isLoading}
      disabled={disabled}
      isOptionEqualToValue={(option, val) =>
        option.researcher_id === val.researcher_id
      }
      onChange={(_, newValue) => onChange(newValue.map((r) => r.researcher_id))}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

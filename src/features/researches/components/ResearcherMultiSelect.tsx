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
    () => new Set(Array.isArray(value) ? (value as number[]) : []),
    [value],
  );

  const selected = useMemo(
    () => researchers.filter((r) => selectedIds.has(r.id)),
    [researchers, selectedIds],
  );

  return (
    <Autocomplete
      multiple
      options={researchers}
      getOptionLabel={(option) =>
        `${option.surname} ${option.name[0]}. ${option.patronymic[0]}.`
      }
      getOptionKey={(option) => option.id}
      value={selected}
      loading={isLoading}
      disabled={disabled}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      onChange={(_, newValue) => onChange(newValue.map((r) => r.id))}
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

import { Autocomplete, TextField } from "@mui/material";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { IResearchData } from "@/shared/types/research";
import { useMemo } from "react";

interface IResearchMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  researches: IResearchData[];
  isLoading: boolean;
  label?: string;
  disabled?: boolean;
}

export const ResearchMultiSelect = <T extends FieldValues>({
  name,
  control,
  researches,
  isLoading,
  label = "Исследования",
  disabled = false,
}: IResearchMultiSelectProps<T>) => {
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
    () => researches.filter((r) => selectedIds.has(r.id)),
    [researches, selectedIds],
  );

  return (
    <Autocomplete
      multiple
      options={researches}
      getOptionLabel={(option) => option.title}
      getOptionKey={(option) => option.id}
      getOptionDisabled={(option) => selectedIds.has(option.id)}
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

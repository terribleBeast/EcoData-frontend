import { Autocomplete, TextField } from "@mui/material";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { IResearchData } from "@/shared/types/research";

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

  const selectedIds = new Set<string>(
    Array.isArray(value) ? (value as string[]) : [],
  );

  const selected = researches.filter((r) => selectedIds.has(r.research_id));

  return (
    <Autocomplete<IResearchData, true>
      multiple
      options={researches}
      getOptionLabel={(option) => option.title}
      getOptionKey={(option) => option.research_id}
      getOptionDisabled={(option) => selectedIds.has(option.research_id)}
      value={selected}
      loading={isLoading}
      disabled={disabled}
      isOptionEqualToValue={(option, val) =>
        option.research_id === val.research_id
      }
      onChange={(_, newValue) => onChange(newValue.map((r) => r.research_id))}
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

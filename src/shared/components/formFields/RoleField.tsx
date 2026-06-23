import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

const roles = [
  { value: "admin", label: "Администратор" },
  { value: "user", label: "Пользователь" },
] as const;

interface IRoleFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
}

export const RoleField = <T extends FieldValues>({
  control,
  name,
  label = "Роль",
}: IRoleFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      defaultValue={roles[1].value as T[Path<T>]}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

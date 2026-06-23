import type { ICommonFieldProps } from "@/shared/types/form";
import { TextField as MuiTextField } from "@mui/material";
import type { FieldValues, Path, RegisterOptions } from "react-hook-form";

interface IFormTextFieldProps<
  T extends FieldValues,
> extends ICommonFieldProps<T> {
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  rules?: RegisterOptions<T, Path<T>>;
}

export const FormTextField = <T extends FieldValues>({
  isLoading,
  errors,
  register,
  name,
  label,
  type = "text",
  autoComplete,
  rules,
}: IFormTextFieldProps<T>) => (
  <MuiTextField
    label={label}
    type={type}
    multiline
    fullWidth
    autoComplete={autoComplete}
    disabled={isLoading}
    error={!!errors[name]}
    helperText={errors[name]?.message as string | undefined}
    {...register(name, rules)}
  />
);

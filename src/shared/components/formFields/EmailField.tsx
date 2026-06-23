import { TextField } from "@mui/material";
import type { FieldValues, Path } from "react-hook-form";
import { EMAIL_REGEX } from "../../utils";
import type { ICommonFieldProps } from "@/shared/types/form";

interface IEmailFieldProps<T extends FieldValues> extends ICommonFieldProps<T> {
  name: Path<T> extends never ? never : Path<T>;
  label?: string;
}

export const EmailField = <T extends FieldValues>({
  isLoading,
  errors,
  register,
  name,
  label = "Email",
}: IEmailFieldProps<T>) => (
  <TextField
    label={label}
    type="email"
    autoComplete="email"
    fullWidth
    disabled={isLoading}
    error={!!errors[name]}
    helperText={errors[name]?.message as string | undefined}
    slotProps={{
      htmlInput: {
        "aria-invalid": errors[name] ? "true" : "false",
      },
    }}
    {...register(name as unknown as Path<T>, {
      required: "Email обязателен",
      pattern: {
        value: EMAIL_REGEX,
        message: "Некорректный email адрес",
      },
    })}
  />
);

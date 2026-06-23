import { TextField } from "@mui/material";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from "react-hook-form";

interface IPhoneFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  disabled?: boolean;
}

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 1) return "+" + digits;
  if (digits.length <= 4) return "+" + `${digits[0]} (${digits.slice(1)}`;
  if (digits.length <= 7)
    return "+" + `${digits[0]} (${digits.slice(1, 4)}) (${digits.slice(4)}`;
  if (digits.length <= 9)
    return (
      "+" +
      `${digits[0]} (${digits.slice(1, 4)}) (${digits.slice(4, 7)}) ${digits.slice(7)}`
    );
  return (
    "+" +
    `${digits[0]} (${digits.slice(1, 4)}) (${digits.slice(4, 7)}) ${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  );
};

export const PhoneNumberField = <T extends FieldValues>({
  name,
  control,
  error,
  label = "Телефон",
  disabled = false,
}: IPhoneFieldProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ name, control });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
    onChange(raw); // store only digits in the form
  };

  return (
    <TextField
      {...field}
      label={label}
      fullWidth
      disabled={disabled}
      value={value ? formatPhone(String(value)) : ""}
      onChange={handleChange}
      error={!!error}
      helperText={error?.message}
      autoComplete="tel"
      inputMode="numeric"
    />
  );
};

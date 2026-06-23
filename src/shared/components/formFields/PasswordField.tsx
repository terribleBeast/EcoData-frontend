import { IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface IPasswordFieldProps<T extends FieldValues> {
  isLoading: boolean;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  name: Path<T>;
  label?: string;
  value?: string;
  showPassword: boolean;
  onClickEye: () => void;
}

export const PasswordField = <T extends FieldValues>({
  isLoading,
  errors,
  register,
  name,
  label = "Пароль",
  showPassword,

  onClickEye,
}: IPasswordFieldProps<T>) => (
  <TextField
    label={label}
    type={showPassword ? "text" : "password"}
    autoComplete="current-password"
    disabled={isLoading}
    error={!!errors[name]}
    helperText={errors[name]?.message as string | undefined}
    fullWidth
    slotProps={{
      htmlInput: {
        "aria-invalid": errors[name] ? "true" : "false",
      },
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onClickEye}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
    }}
    {...register(name, {
      required: "Пароль обязателен",
      minLength: {
        value: 4,
        message: "Пароль должен содержать минимум 4 символа",
      },
    })}
  />
);

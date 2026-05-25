import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { EMAIL_REGEX } from "../utils";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { ICheckExistUser } from "@/shared/types/user";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export interface IFieldProps {
  isLoading: boolean;
  errors: FieldErrors<ICheckExistUser>;
  register: UseFormRegister<ICheckExistUser>;
}

export const EmailField = ({ isLoading, errors, register }: IFieldProps) => {
  return (
    <Grid size={12}>
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        fullWidth
        disabled={isLoading}
        error={!!errors.email}
        helperText={errors.email?.message}
        slotProps={{
          htmlInput: {
            "aria-invalid": errors.email ? "true" : "false",
          },
        }}
        {...register("email", {
          required: "Email обязателен",
          pattern: {
            value: EMAIL_REGEX,
            message: "Некорректный email адрес",
          },
        })}
      />
    </Grid>
  );
};

interface IPasswordFieldProps extends IFieldProps {
  showPassword: boolean;
  onClickEye: () => void;
}
export const PasswordField = ({
  isLoading,
  errors,
  register,
  showPassword,
  onClickEye,
}: IPasswordFieldProps) => (
  <Grid size={12}>
    <TextField
      label="Пароль"
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      disabled={isLoading}
      error={!!errors.password_hash?.message}
      helperText={errors.password_hash?.message}
      fullWidth
      slotProps={{
        htmlInput: {
          "aria-invalid": errors.password_hash ? "true" : "false",
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
      {...register("password_hash", {
        required: "Пароль обязателен",
        minLength: {
          value: 4,
          message: "Пароль должен содержать минимум 4 символа",
        },
      })}
    />
  </Grid>
);

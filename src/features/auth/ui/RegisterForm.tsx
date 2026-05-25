import { useForm } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";

import type { IFormRegProps } from "../types";
import type { ICreateUser } from "@/shared/types/user";
import {
  EmailField,
  PasswordField,
  type IFieldProps,
} from "../components/FormFields";
import { AuthFormTemplate } from "../components/AuthFormTemplate";

const RegisterForm = ({
  isLoading,
  isError,
  errorMsg,
  onSubmit,
  onSwitchForm,
}: IFormRegProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const fieldProps: IFieldProps = {
    register,
    errors,
    isLoading,
  };

  return (
    <AuthFormTemplate
      title="Регистрация"
      submitLabel="Зарегистрироваться"
      submitLoadingLabel="Создание..."
      isLoading={isLoading}
      isError={isError}
      errorMsg={errorMsg}
      isLoginForm={false}
      onSubmit={handleSubmit(onSubmit)}
      onSwitchForm={onSwitchForm}
    >
      {/* Surname */}
      <Grid size={12}>
        <TextField
          label="Фамилия"
          type="text"
          fullWidth
          autoComplete="family-name"
          disabled={isLoading}
          error={!!errors.surname}
          helperText={errors.surname?.message}
          {...register("surname", {
            required: "Фамилия обязательно",
          })}
        />
      </Grid>
      {/* Name */}
      <Grid size={12}>
        <TextField
          label="Имя"
          type="text"
          fullWidth
          autoComplete="name"
          disabled={isLoading}
          error={!!errors.name}
          helperText={errors.name?.message}
          {...register("name", {
            required: "Имя обязательно",
          })}
        />
      </Grid>
      {/* Patronymic */}
      <Grid size={12}>
        <TextField
          label="Отчество"
          type="text"
          fullWidth
          autoComplete="additional-name"
          disabled={isLoading}
          error={!!errors.patronymic}
          helperText={errors.patronymic?.message}
          {...register("patronymic", {
            required: "Отчество обязательно",
          })}
        />
      </Grid>
      <EmailField {...fieldProps} />

      <PasswordField
        {...fieldProps}
        showPassword={showPassword}
        onClickEye={handleShowPassword}
      />
    </AuthFormTemplate>
  );
};

export default RegisterForm;

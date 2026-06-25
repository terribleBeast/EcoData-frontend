import { useForm } from "react-hook-form";
import { useState } from "react";

import {
  EmailField,
  PasswordField,
  FormTextField,
} from "@/shared/components/formFields";
import { AuthFormTemplate } from "@/features/auth/components/AuthFormTemplate";
import type { RegisterRequest } from "@/shared/types/user";
import type { IAuthFormProps } from "../types";
import type { ICommonFieldProps } from "@/shared/types/form";

const RegisterForm = ({
  endpointState,
  onSubmit,
  isLogInForm,
  onSwitchForm,
}: IAuthFormProps<RegisterRequest>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const commonFieldProps: ICommonFieldProps<RegisterRequest> = {
    isLoading: endpointState.isLoading,
    errors: errors,
    register: register,
  };
  return (
    <AuthFormTemplate
      title="Регистрация"
      submitLabel="Зарегистрироваться"
      submitLoadingLabel="Создание..."
      endpointState={endpointState}
      isLogInForm={isLogInForm}
      onSwitchForm={onSwitchForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormTextField<RegisterRequest>
        {...commonFieldProps}
        name="last_name"
        label="Фамилия"
        autoComplete="family-name"
        rules={{ required: "Фамилия обязательна" }}
      />

      <FormTextField<RegisterRequest>
        {...commonFieldProps}
        name="first_name"
        label="Имя"
        autoComplete="given-name"
        rules={{ required: "Имя обязательно" }}
      />

      <FormTextField<RegisterRequest>
        {...commonFieldProps}
        name="patronymic"
        label="Отчество"
        autoComplete="additional-name"
      />

      <EmailField<RegisterRequest> {...commonFieldProps} name="email" />

      <PasswordField<RegisterRequest>
        isLoading={endpointState.isLoading}
        errors={errors}
        register={register}
        name="password"
        showPassword={showPassword}
        onClickEye={handleShowPassword}
      />
    </AuthFormTemplate>
  );
};

export default RegisterForm;

import { useForm } from "react-hook-form";
import { useState } from "react";

import type { IFormLogInProps } from "../types";
import type { LoginRequest } from "@/shared/types/user";
import { ForgotPasswordButton } from "../components/authPageButtons";
import { AuthFormTemplate } from "@/features/auth/components/AuthFormTemplate";
import {
  EmailField,
  PasswordField,
} from "@/shared/components/formFields/index";
import type { ICommonFieldProps } from "@/shared/types/form";
import Alert from "@mui/material/Alert";

const LoginForm = ({
  endpointState,
  onSubmit,
  isLogInForm,
  onSwitchForm,
  onForgotPassword,
  showAlertForgotPassword,
}: IFormLogInProps<LoginRequest>) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: "onBlur",
    reValidateMode: "onSubmit",
  });

  const commonFieldProps: ICommonFieldProps<LoginRequest> = {
    isLoading: endpointState.isLoading,
    errors: errors,
    register: register,
  };

  return (
    <>
      {showAlertForgotPassword && (
        <Alert
          sx={{ margin: "1rem" }}
          severity="info"
          onClose={onForgotPassword}
        >
          Для восстановления доступа обратитесь по адресу
          ecodataHelper@gmail.com
        </Alert>
      )}
      <AuthFormTemplate
        title="Вход"
        submitLabel="Войти"
        submitLoadingLabel="Вход..."
        endpointState={endpointState}
        isLogInForm={isLogInForm}
        onSwitchForm={onSwitchForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <EmailField<LoginRequest> {...commonFieldProps} name="email" />

        <PasswordField<LoginRequest>
          isLoading={endpointState.isLoading}
          errors={errors}
          register={register}
          name="password"
          showPassword={showPassword}
          onClickEye={() => setShowPassword((prev) => !prev)}
        />

        {/* Forgot password — right-aligned below the password field */}
        <ForgotPasswordButton
          onClick={onForgotPassword}
          disabled={endpointState.isLoading}
        />
      </AuthFormTemplate>
    </>
  );
};

export default LoginForm;

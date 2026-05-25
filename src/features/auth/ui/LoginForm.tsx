import { useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { useState } from "react";

import type { IFormLogInProps } from "../types";
import type { ICheckExistUser } from "@/shared/types/user";
import {
  EmailField,
  PasswordField,
  type IFieldProps,
} from "../components/FormFields";
import { ForgotPasswordButton } from "../components/authPageButtons";
import { AuthFormTemplate } from "../components/AuthFormTemplate";

const LoginForm = ({
  isLoading,
  onSubmit,
  isError,
  errorMsg,
  onForgotPassword,
  onSwitchForm,
}: IFormLogInProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckExistUser>({
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
      title="Вход"
      submitLabel="Войти"
      submitLoadingLabel="Вход..."
      isLoading={isLoading}
      isError={isError}
      errorMsg={errorMsg}
      isLoginForm
      onSubmit={handleSubmit(onSubmit)}
      onSwitchForm={onSwitchForm}
    >
      <EmailField {...fieldProps} />

      <PasswordField
        {...fieldProps}
        showPassword={showPassword}
        onClickEye={handleShowPassword}
      />

      {/* Forgot password — right-aligned below the password field */}
      <Grid size={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ForgotPasswordButton onClick={onForgotPassword} disabled={isLoading} />
      </Grid>
    </AuthFormTemplate>
  );
};

export default LoginForm;

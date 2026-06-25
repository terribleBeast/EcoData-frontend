import { useState } from "react";
import { useUserLogin } from "./useUserLogin";
import { useUserReg } from "./useUserReg";
import type { IAuthFormProps, IFormLogInProps } from "../types";
import type { LoginRequest, RegisterRequest } from "@/shared/types/user";
import { Alert } from "@mui/material";

export const useAuthPage = () => {
  const [isLogInForm, setIsLogInForm] = useState(true);
  const [showAlter, setShowAltert] = useState(false);

  const handleChangeForm = () => {
    setIsLogInForm((prev) => !prev);
  };
  const handleClickForgotPassword = () => {
    setShowAltert(!showAlter);
  };

  const { handleReg, endpointState: registerEndpointState } = useUserReg();
  const { handleLogIn, endpointState: logInEndpointState } = useUserLogin();

  const regFormProps: IAuthFormProps<RegisterRequest> = {
    endpointState: {
      ...registerEndpointState,
      successMsg: "Пользователь создан",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onSubmit: async (formData) => handleReg(formData),
  };

  const logInFormProps: IFormLogInProps<LoginRequest> = {
    endpointState: {
      ...logInEndpointState,
      successMsg: "Вход выполнен",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onForgotPassword: handleClickForgotPassword,
    showAlertForgotPassword: showAlter,
    onSubmit: async (formData) => handleLogIn(formData),
  };

  return {
    isLogInForm,
    handleChangeForm,
    regFormProps,
    logInFormProps,
    onSwitchForm: handleChangeForm,
  };
};

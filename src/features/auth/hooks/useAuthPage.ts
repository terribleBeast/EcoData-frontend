import { useState } from "react";
import { useUserLogin } from "./useUserLogin";
import { useUserReg } from "./useUserReg";
import type { IAuthFormProps, IFormLogInProps } from "../types";
import type { ICheckExistUser, ICreateUser } from "@/shared/types/user";
import { MD5 } from "crypto-es";

export const useAuthPage = () => {
  const [isLogInForm, setIsLogInForm] = useState(true);

  const handleChangeForm = () => {
    setIsLogInForm((prev) => !prev);
  };
  const handleClickForgotPassword = () => console.log("Forgot password");

  const { handleReg, endpointState: registerEndpointState } = useUserReg();
  const { handleLogIn, endpointState: logInEndpointState } = useUserLogin();

  const hashString = (str: string) => {
    return MD5(str).toString();
  };

  const regFormProps: IAuthFormProps<ICreateUser> = {
    endpointState: {
      ...registerEndpointState,
      successMsg: "Пользователь создан",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onSubmit: async (formData) =>
      handleReg({
        ...formData,
        password_hash: hashString(formData.password_hash),
      }),
  };

  const logInFormProps: IFormLogInProps<ICheckExistUser> = {
    endpointState: {
      ...logInEndpointState,
      successMsg: "Вход выполнен",
    },
    isLogInForm,
    onSwitchForm: handleChangeForm,
    onForgotPassword: handleClickForgotPassword,
    onSubmit: async (formData) =>
      handleLogIn({
        ...formData,
        password_hash: hashString(formData.password_hash),
      }),
  };

  return {
    isLogInForm,
    handleChangeForm,
    regFormProps,
    logInFormProps,
    onSwitchForm: handleChangeForm,
  };
};

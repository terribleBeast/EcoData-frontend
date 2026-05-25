import { useState } from "react";
import { useUserLogin } from "./useUserLogin";
import { useUserReg } from "./useUserReg";
import type { IFormLogInProps, IFormRegProps } from "../types";

export const useAuthPage = () => {
  const [isLogInForm, setIsLogInForm] = useState(true);

  const handleChangeForm = () => setIsLogInForm((prev) => !prev);
  const handleClickForgotPassword = () => console.log("Forgot password");
  // const onSubmit: SubmitHandler<IUserDataReg> = async (
  //   formData: IUserDataReg,
  // ) => {
  //   }
  // };
  const {
    isLoading: isLoadingReg,
    handleReg,
    error: errorReg,
    isError: isErrorReg,
  } = useUserReg();
  const {
    isLoading: isLoadingLogIn,
    handleLogIn,
    error: errorLogIn,
    isError: isErrorLogIn,
  } = useUserLogin();

  const regFormProps: IFormRegProps = {
    isLoading: isLoadingReg,
    errorMsg: errorReg,
    isError: isErrorReg,
    onSubmit: async (formData) => handleReg(formData),
    onSwitchForm: handleChangeForm,
  };

  const logInFormProps: IFormLogInProps = {
    isLoading: isLoadingLogIn,
    errorMsg: errorLogIn,
    isError: isErrorLogIn,
    onForgotPassword: handleClickForgotPassword,
    onSubmit: async (formData) => handleLogIn(formData),
    onSwitchForm: handleChangeForm,
  };

  return {
    isLogInForm,
    handleChangeForm,
    regFormProps,
    logInFormProps,
  };
};

import type { ICheckExistUser, ICreateUser } from "@/shared/types/user";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SubmitHandler } from "react-hook-form";

export interface IFormProps {
  isLoading: boolean;
  isError: boolean;
  errorMsg: FetchBaseQueryError | SerializedError | undefined;
  onSwitchForm: () => void;
}

export interface IFormRegProps extends IFormProps {
  onSubmit: SubmitHandler<ICreateUser>;
}

export interface IFormLogInProps extends IFormProps {
  onSubmit: SubmitHandler<ICheckExistUser>;
  onForgotPassword: () => void;
}

import type { IFormProps } from "@/shared/types/form";
import type { SubmitHandler } from "react-hook-form";

export interface IAuthFormProps<T> extends IFormProps<T> {
  onSwitchForm: () => void;
  isLogInForm: boolean;
}

export interface IFormLogInProps<
  ICheckExistUser,
> extends IAuthFormProps<ICheckExistUser> {
  onSubmit: SubmitHandler<ICheckExistUser>;
  onForgotPassword: () => void;
}

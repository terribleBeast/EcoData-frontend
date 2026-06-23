import { Grid } from "@mui/material";

import { StateFormButton } from "./authPageButtons";
import React from "react";
import type { IFormEntityTemplateProps } from "@/shared/types/form";
import { FormTemplate } from "@/shared/ui/FormTemplate";
import { SubmitFormButton } from "@/shared/components/SubmitFormButton";

export interface IAuthFormTemplateProps extends IFormEntityTemplateProps {
  isLogInForm: boolean;
  onSwitchForm: () => void;
}

export const AuthFormTemplate = ({
  title,
  submitLabel,
  submitLoadingLabel,
  endpointState,
  onSubmit,
  isLogInForm,
  onSwitchForm,
  children,
}: IAuthFormTemplateProps) => {
  return (
    <FormTemplate
      title={title}
      endpointState={endpointState}
      onSubmit={onSubmit}
    >
      {/* Injected fields */}
      {React.Children.map(children, (child) => (
        <Grid size={12}> {child}</Grid>
      ))}

      {/* Submit */}
      <SubmitFormButton
        isLoading={endpointState.isLoading}
        submitLabel={submitLabel}
        submitLoadingLabel={submitLoadingLabel}
      />
      {/* Switch to other form */}
      <StateFormButton
        isLoginForm={isLogInForm}
        isLoading={endpointState.isLoading}
        onClick={onSwitchForm}
      />
    </FormTemplate>
  );
};

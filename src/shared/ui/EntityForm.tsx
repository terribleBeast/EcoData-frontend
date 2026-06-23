import React from "react";
import type { IFormEntityTemplateProps } from "../types/form";
import { FormTemplate } from "./FormTemplate";
import { Grid } from "@mui/material";
import { SubmitFormButton } from "../components/SubmitFormButton";

export const EntityForm = ({
  title,
  submitLabel,
  submitLoadingLabel,
  endpointState,
  onSubmit,
  children,
}: IFormEntityTemplateProps) => (
  <FormTemplate title={title} endpointState={endpointState} onSubmit={onSubmit}>
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
  </FormTemplate>
);

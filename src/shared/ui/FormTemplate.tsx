import { Alert, Box, Grid, Typography } from "@mui/material";

import { deriveErrorMessage } from "@/shared/utils";
import { formStyle, formTitleStyle } from "@/shared/ui/styles";
import type { IFormTemplateProps } from "@/shared/types/form";
import React from "react";

export const FormTemplate = ({
  title,
  endpointState,
  onSubmit,
  children,
}: IFormTemplateProps) => {
  return (
    <Box sx={formStyle}>
      {/* Title */}
      <Typography
        sx={[
          formTitleStyle,
          // (theme) => ({ color: theme.palette.primary.main }),
        ]}
      >
        {title}
      </Typography>

      {/* Server-level error */}
      {endpointState.isError && (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
          {deriveErrorMessage(endpointState.error)}
        </Alert>
      )}
      {/* Server-level success message */}
      {endpointState.isSuccess && (
        <Alert severity="success" sx={{ mb: 2, width: "100%" }}>
          {endpointState.successMsg}
        </Alert>
      )}

      {/* Form */}
      <Box
        component="form"
        sx={{ width: "100%" }}
        noValidate
        onSubmit={onSubmit}
      >
        <Grid container spacing={2}>
          {/* Injected fields */}
          {React.Children.map(children, (child) => (
            <Grid size={12}> {child}</Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

import { deriveErrorMessage } from "../utils";
import { formStyle, formTitleStyle } from "../ui/styles";
import { StateFormButton } from "./authPageButtons";
import type { IFormProps } from "../types";

export interface IAuthFormTemplateProps extends IFormProps {
  title: string;
  submitLabel: string;
  submitLoadingLabel: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onSwitchForm: () => void;
  isLoginForm: boolean;
  children: ReactNode;
}

export const AuthFormTemplate = ({
  title,
  submitLabel,
  submitLoadingLabel,
  isLoading,
  isError,
  errorMsg,
  onSubmit,
  onSwitchForm,
  isLoginForm,
  children,
}: IAuthFormTemplateProps) => (
  <Box sx={formStyle}>
    {/* Title */}
    <Typography sx={formTitleStyle}>{title}</Typography>

    {/* Server-level error */}
    {isError && (
      <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
        {deriveErrorMessage(errorMsg)}
      </Alert>
    )}

    {/* Form */}
    <Box component="form" sx={{ width: "100%" }} noValidate onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {/* Injected fields */}
        {children}

        {/* Submit */}
        <Grid size={12}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
            sx={(theme) => ({
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            })}
          >
            {isLoading ? submitLoadingLabel : submitLabel}
          </Button>
        </Grid>

        {/* Switch to other form */}
        <Grid size={12}>
          <StateFormButton
            isLoginForm={isLoginForm}
            isLoading={isLoading}
            onClick={onSwitchForm}
          />
        </Grid>
      </Grid>
    </Box>
  </Box>
);

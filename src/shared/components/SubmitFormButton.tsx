import { Button, CircularProgress } from "@mui/material";

export const SubmitFormButton = ({
  isLoading,
  submitLabel,
  submitLoadingLabel,
}: {
  isLoading: boolean;
  submitLoadingLabel: string;
  submitLabel: string;
}) => (
  <Button
    type="submit"
    variant="contained"
    color="success"
    fullWidth
    disabled={isLoading}
    // startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
    sx={(theme) => ({
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    })}
  >
    {isLoading ? submitLoadingLabel : submitLabel}
  </Button>
);

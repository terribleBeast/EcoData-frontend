import {
  Button,
  CircularProgress,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { actionLinkSx } from "../ui/styles";
import { Link as RouterLink } from "react-router";
export const ForgotPasswordButton = ({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="text"
      disableRipple
      disabled={disabled}
      onClick={onClick}
      sx={actionLinkSx}
      aria-label="Восстановить пароль"
    >
      Забыли пароль?
    </Button>
  );
};
export const WithoutAuthButton = ({
  onClick,
}: {
  onClick: () => void;
  textState: boolean;
}) => (
  <MuiLink
    component={RouterLink}
    to="/"
    underline="none"
    onClick={onClick}
    aria-label={"Продолжить без входа"}
    sx={{
      ...actionLinkSx,
      marginTop: "1.5rem",
      alignSelf: "center",
    }}
  >
    <Typography component="span">{"Продолжить без входа"}</Typography>
  </MuiLink>
);

interface IStateFormProps {
  onClick: () => void;
  isLoading: boolean;
  /** `true` = currently viewing the login form */
  isLoginForm: boolean;
}
export const StateFormButton = ({
  onClick,
  isLoading,
  isLoginForm,
}: IStateFormProps) => (
  <Button
    variant="outlined"
    color="success"
    fullWidth
    type="button"
    disabled={isLoading}
    onClick={onClick}
    startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
    sx={(theme) => ({
      borderColor: theme.palette.success.main,
      color: theme.palette.success.main,
      "&:hover": {
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.success.light,
        color: theme.palette.primary.dark,
      },
    })}
  >
    {isLoginForm ? "Создать аккаунт" : "Войти"}
  </Button>
);

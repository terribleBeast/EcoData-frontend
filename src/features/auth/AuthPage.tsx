import { Typography, Box } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
import LoginForm from "./ui/LoginForm";
import RegisterForm from "./ui/RegisterForm";
import { useAuthPage } from "./hooks/useAuthPage";
import { WithoutAuthButton } from "./components/authPageButtons";

const AuthForm = () => {
  const { isLogInForm, logInFormProps, regFormProps } = useAuthPage();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        backgroundColor: "backgroundPage",
        padding: "2rem",
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <SpaIcon sx={{ fontSize: 32 }} />
        <Typography
          sx={(theme) => ({
            fontSize: "2rem",
            fontWeight: "bold",
            color: theme.palette.primary.main,
          })}
        >
          EcoData
        </Typography>
      </Box>

      {/* Form card */}
      {isLogInForm ? (
        <LoginForm {...logInFormProps} />
      ) : (
        <RegisterForm {...regFormProps} />
      )}

      {/* Text link below the card */}
      <WithoutAuthButton onClick={() => console.error("NOT IMPLEMENT")} />
    </Box>
  );
};

export default AuthForm;

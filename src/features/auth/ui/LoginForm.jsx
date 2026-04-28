import { useForm } from "react-hook-form";
import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

// import { toLogIn } from "../features/user/userSlice"
import { useLazyGetUserQuery } from "../../api/usersAPI";
import { toLogIn } from "../../user/userSlice";

// import './../App.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    // formState: { errors },
    watch,
  } = useForm();

  const { email, password } = watch();

  // const validateEmail = (value) => {
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   if (!emailRegex.test(value)) {
  //     return 'Invalid email address';
  //   }
  //   return true;
  // };
  //
  const [getUser] = useLazyGetUserQuery();

  const onInput = useCallback(async () => {
    setError("Error input");
  }, []);
  const onChange = async () => {
    setError("Error input");
  };

  const onSubmit = () => {
    // Working without async await
    //
    // event.preventDefault();
    console.log("onSubmit");
    // TODO: error proccesing
    try {
      const user = getUser(email).unwrap();
      if (user !== undefined && user.password === password) {
        dispatch(
          toLogIn({
            login: user.email,
            id: user.id,
            name: user.name,
          }),
        );
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Typography className="login-form-title">Вход</Typography>
      </Box>
      <form
        style={{ width: "100%" }}
        // onSubmit={handleSubmit(onSubmit)}>
        onSubmit={onSubmit}
      >
        <Grid sx={{ width: "100%", "& > *": { width: "100%" } }}>
          <Grid item>
            <Typography className="form-field-text">Email</Typography>

            <TextField
              // {...register("email", {
              //   required: true,
              //   pattern: {
              //     value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              //     message: "Invalid email address",
              //   },
              // })}
              variant="outlined"
              className="login-input"
              // onInput={onInput}
              onChange={onChange}
              // error={error}
            />
          </Grid>
          <Grid item>
            <Typography className="form-field-text">Пароль</Typography>
            <TextField
              // {...register("password", {
              //   required: true,
              //   minLenght: 4,
              // })}
              type="password"
              className="login-input"
              // error={error}
            />
          </Grid>
          <Grid item>
            <Button type="submit" className="login-button">
              Войти
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;

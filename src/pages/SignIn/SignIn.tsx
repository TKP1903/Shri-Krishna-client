import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// custom imports
import { ErrorsMapper } from '../../Components/common';
// constants
import { BRAND_NAME } from '../../config';
import { UserContext } from '../../helpers/UserDataContext';
// types
import { LoginDetails, LoginResponse } from '../../types';
import { login } from '../../utils/api/auth';
import { debounce, throttle } from '../../utils/js';
import { isValidEmail, isValidPassword } from '../../utils/validators';

const { useState, useEffect, useContext } = React;
function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        {BRAND_NAME}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const formData = {
  email: "",
  password: "",
};

export default function SignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { setRememberMe, setUser, setTokens } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<{
    email: string[];
    password: string[];
  }>({
    email: [],
    password: [],
  });

  //* all hooks end here

  const handle = {
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    email: (input: string) => {
      try {
        const err = isValidEmail(input);
        if (err.email.length === 0) {
          formData.email = input;
        }
        setErrors((prev) => ({
          ...prev,
          email: err.email || [],
        }));
      } catch (err) {
        console.log(err);
      }
    },
    password: (input: string) => {
      try {
        const err = isValidPassword(input);
        if (err.password.length === 0) {
          formData.password = input;
        }
        setErrors((prev) => ({
          ...prev,
          password: err.password || [],
        }));
      } catch (err) {
        console.log(err);
      }
    },
    rememberMe: (input: boolean) => {
      setRememberMe(input);
    },
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = Object.fromEntries(new FormData(event.currentTarget));

      const loginDetails: LoginDetails = {
        email: String(formData.email || ""),
        password: String(formData.password || ""),
      };
      // TODO: send data to server
      const res: LoginResponse = await login(loginDetails);

      setUser(res.user);
      setTokens(res.tokens);
      enqueueSnackbar("Login Successful", {
        variant: "success",
      });
      switch (res.user.role) {
        case "admin":
          await navigate("/admin-panel");
          break;
        case "user":
          await navigate("/user-panel");
          break;
        default:
          await navigate("/");
          enqueueSnackbar("Invalid User Role. Contact your adminstrator.", {
            variant: "error",
          });
          break;
      }
    } catch (err: any) {
      console.log(err);
      enqueueSnackbar(
        err.message || "Unkown Error, Please contact your administrator",
        { variant: "error" }
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
              margin: "1rem 0",
              backgroundColor: "#f5f5f5",
              borderRadius: "0.5rem",
              boxShadow: "0 0 0.5rem #00000020",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={debounce(
                  (e: any) => handle.email(e.target.value),
                  500
                )}
                autoFocus
              />
              <ErrorsMapper errors={errors.email} />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handle.toggleShowPassword}
                        onMouseDown={handle.toggleShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                id="password"
                onChange={debounce(
                  (e: any) => handle.password(e.target.value),
                  500
                )}
                autoComplete="current-password"
              />
              <ErrorsMapper errors={errors.password} />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                onChange={(e: any) => handle.rememberMe(e.target.checked)}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navigate("forgot-password");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="body2" onClick={() => navigate("/register")}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

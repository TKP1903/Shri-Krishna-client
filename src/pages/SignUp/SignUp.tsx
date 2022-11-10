import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ErrorsMapper } from "../../Components/common";
import {
  isValidEmail,
  isValidMobile,
  isValidPassword,
  isValidUsername,
  isValidName,
} from "../../utils/validators";
import { BRAND_NAME } from "../../config";
import { useReload } from "../../utils/hooks";
import { debounce, throttle } from "../../utils/js";

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

const formData: {
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  qualification: string;
} = {
  email: "",
  mobile: 0,
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  qualification: "",
};

export default function SignUp() {
  const reload = useReload();

  const [qualification, setQualification] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const [errors, setErrors] = useState({
    email: [""],
    mobile: [""],
    password: [""],
    confirmPassword: [""],
    firstName: [""],
    lastName: [""],
    qualification: [""],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlers = {
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
    mobile: (input: number) => {
      try {
        const err = isValidMobile(input);
        if (err.mobile.length === 0) {
          formData.mobile = input;
        }
        setErrors((prev) => ({
          ...prev,
          mobile: err.mobile || [],
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
    confirmPassword: (input: string) => {
      try {
        if (!formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: ["Password is required"],
          }));
          return;
        }
        if (input !== formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: ["Passwords do not match"],
          }));
          return;
        }
        formData.confirmPassword = input;
        setErrors((prev) => ({
          ...prev,
          confirmPassword: [],
        }));
      } catch (err) {}
    },
    firstName: (input: string) => {
      const err = isValidName(input);
      if (err.name.length === 0) {
        formData.firstName = input;
      }
      setErrors((prev) => ({
        ...prev,
        firstName: err.name || [],
      }));
    },
    lastName: (input: string) => {
      const err = isValidName(input);
      if (err.name.length === 0) {
        formData.lastName = input;
      }
      setErrors((prev) => ({
        ...prev,
        lastName: err.name || [],
      }));
    },
    qualification: (input: string) => {
      formData.qualification = input;
      reload();
    },
    isAgreed: (input: boolean) => {
      setIsAgreed(input);
    },
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
    } catch (err) {}
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={debounce(handleSubmit, 1000)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  // debounce and handle onChange
                  onChange={debounce((e : any) => {
                    handlers.firstName(e.target.value);
                  }, 200)}
                  autoFocus
                />
                <Stack>
                  {!!errors &&
                    !!errors.firstName &&
                    !!errors.firstName.length &&
                    !!errors.firstName[0] &&
                    errors.firstName.map((err, i) => (
                      <Alert severity="error" key={i}>
                        {err}
                      </Alert>
                    ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={debounce((e : any) => {
                    handlers.lastName(e.target.value);
                  }, 200)}
                  autoComplete="family-name"
                />
                <ErrorsMapper errors={errors.lastName} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={debounce((e : any) => {
                    handlers.email(e.target.value);
                  }, 200)}
                />
                <ErrorsMapper errors={errors.email} />
              </Grid>
              {/* mobile number */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="mobile"
                  onChange={debounce((e : any) => {
                    handlers.mobile(Number(e.target.value));
                  }, 200)}
                />
                <ErrorsMapper errors={errors.mobile} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={debounce((e : any) => {
                    handlers.password(e.target.value);
                  }, 200)}
                  autoComplete="new-password"
                />
                <ErrorsMapper errors={errors.password} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Comfirm Password"
                  type="password"
                  id="comfirm-password"
                  onChange={debounce((e : any) => {
                    handlers.confirmPassword(e.target.value);
                  }, 200)}
                  autoComplete="new-password"
                />
                <ErrorsMapper errors={errors.confirmPassword} />
              </Grid>
              {/* select qulification 11th 12th Graduate Post-Graduate */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="label-select-quilification">
                    Select Qualification
                  </InputLabel>
                  <Select
                    labelId="label-select-quilification"
                    id="select-quilification"
                    label="Select Qualification"
                    value={formData.qualification}
                    onChange={debounce((e : any) => {
                      handlers.qualification(e.target.value);
                    }, 200)}
                    fullWidth
                  >
                    <MenuItem value="11th">11th</MenuItem>
                    <MenuItem value="12th">12th</MenuItem>
                    <MenuItem value="Graduate">Graduate</MenuItem>
                    <MenuItem value="Post-Graduate">Post-Graduate</MenuItem>
                  </Select>
                </FormControl>
                <ErrorsMapper errors={errors.qualification} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

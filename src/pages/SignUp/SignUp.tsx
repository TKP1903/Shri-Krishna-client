import { useSnackbar } from "notistack";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { ErrorsMapper } from "../../Components/common";
import { BRAND_NAME } from "../../config";
import __CountryCodes from "../../data/names&codes.json";
import { RegisterDetails } from "../../types";
import { register } from "../../utils/api/auth";
import { useReload } from "../../utils/hooks";
import { debounce, throttle } from "../../utils/js";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
  isValidUsername,
} from "../../utils/validators";

const { useState, useEffect, useRef } = React;

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

const CountryCodes = __CountryCodes as Array<{
  country: string;
  code: string;
  dail: string;
}>;
const theme = createTheme();

const formData: {
  email: string;
  phone: number;
  dailCode: string;
  password: string;
  firstName: string;
  lastName: string;
  qualification: string;
} = {
  email: "",
  phone: 0,
  dailCode: "91",
  password: "",
  firstName: "",
  lastName: "",
  qualification: "",
};

const CountryCodeMenuItems = CountryCodes.map((obj) => (
  <MenuItem value={obj.dail}>
    <img
      src={`https://countryflagsapi.com/png/${obj.code.toLowerCase()}`}
      alt={obj.code}
      width={27}
      height={15}
      style={{ marginRight: "10px" }}
      loading="lazy"
    />
    ({obj.dail}) {obj.country}
  </MenuItem>
));

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const reload = useReload();

  const [isAgreed, setIsAgreed] = useState(false);

  const [errors, setErrors] = useState({
    email: [""],
    phone: [""],
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
    phone: (input: number) => {
      try {
        const err = isValidPhone(input);
        if (err.phone.length === 0) {
          formData.phone = input;
        }
        setErrors((prev) => ({
          ...prev,
          phone: err.phone || [],
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
    dailCode: (input: string) => {
      formData.dailCode = input;
      reload();
    },
    isAgreed: (input: boolean) => {
      setIsAgreed(input);
    },
  };

  // debug only
  useEffect(() => {
    console.log({ formData });
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const userDetails: RegisterDetails = {
        name: `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
        email: formData.email,
        phone: {
          dailCode: "+91",
          number: formData.phone,
        },
        qualification: formData.qualification,
        country: "India",
      };
      const user = await register(userDetails);
      enqueueSnackbar("Registered successfully", { variant: "success" });
      navigate("/login");
      console.log({ user });
    } catch (err: any) {
      console.log(err);
      if (!!err?.message) {
        enqueueSnackbar(err?.message || "Something went wrong", {
          variant: "error",
        });
      }
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
            Sign up
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
              noValidate
              onSubmit={handleSubmit}
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
                    onChange={debounce((e: any) => {
                      handlers.firstName(e.target.value);
                    }, 200)}
                    autoFocus
                  />
                  <ErrorsMapper errors={errors.firstName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={debounce((e: any) => {
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
                    onChange={debounce((e: any) => {
                      handlers.email(e.target.value);
                    }, 200)}
                  />
                  <ErrorsMapper errors={errors.email} />
                </Grid>
                {/* phone number */}
                <Grid item xs={12}>
                  <Grid container xs={12} spacing={0}>
                    <Grid item xs={3}>
                      <FormControl
                        // fix width and leave gap
                        sx={{ width: "90%" }}
                      >
                        <InputLabel id="label-country-code">
                          Country Code
                        </InputLabel>
                        <Select
                          labelId="label-country-code"
                          id="country-code"
                          value={formData.dailCode}
                          label="Country Code"
                          MenuProps={{
                            // reduce height of dropdown
                            PaperProps: {
                              style: {
                                maxHeight: 48 * 4.5 + 8,
                                width: 250,
                              },
                            },
                          }}
                          onChange={debounce((e: any) => {
                            handlers.dailCode(e.target.value);
                          }, 100)}
                        >
                          {CountryCodeMenuItems}
                          {/* {CountryCodes.map((obj) => (
                          <MenuItem value={obj.dail}>
                            <img
                              src={`https://countryflagsapi.com/png/${obj.code.toLowerCase()}`}
                              alt={obj.code}
                              width={32}
                              height={32}
                              style={{ marginRight: "10px" }}
                              loading="lazy"
                            />
                            {obj.country} ({obj.dail})
                          </MenuItem>
                        ))} */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        required
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        onChange={debounce((e: any) => {
                          handlers.phone(Number(e.target.value));
                        }, 200)}
                      />
                      <ErrorsMapper errors={errors.phone} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={debounce((e: any) => {
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
                    onChange={debounce((e: any) => {
                      handlers.confirmPassword(e.target.value);
                    }, 200)}
                    autoComplete="new-password"
                  />
                  <ErrorsMapper errors={errors.confirmPassword} />
                </Grid>
                {/* select qulification 11th 12th Graduate Post-Graduate */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="label-select-qualification">
                      Select Qualification
                    </InputLabel>
                    <Select
                      labelId="label-select-qualification"
                      id="select-qualification"
                      label="Select Qualification"
                      value={formData.qualification}
                      onChange={debounce((e: any) => {
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
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        onChange={(e) => {}}
                      />
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
                  <Link  variant="body2" onClick={() => {navigate ("/login")}}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </div>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

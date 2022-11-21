import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          fontFamily: `"PlusJakartaSans-Bold", -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol" !important`,
        }}
      >
        Shri Krishna Institute<sup>&reg;</sup>
      </Typography>

      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
        sx={{
          fontFamily: `"PlusJakartaSans-Bold", -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji",
          "Segoe UI Emoji", "Segoe UI Symbol" !important`,
        }}
      >
        Unlock your true potential with courses from world’s top teachers and
        mentors.
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.Primary"
        paragraph
        sx={{
          marginTop: "1rem",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register Now
        </Button>
      </Typography>
    </>
  );
}

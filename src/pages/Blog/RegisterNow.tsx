import * as React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

export default function RegisterNow() {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={4}
      style={{
        paddingTop: "0rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/demo-videos");
        }}
      >
        Watch Demo Vedios
      </Button>
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register Now
      </Button>
    </Grid>
  );
}

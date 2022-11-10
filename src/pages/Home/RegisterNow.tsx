import * as React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function RegisterNow() {
  const navigate = useNavigate();
  return (
    <>
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
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Register Now
      </Button>
    </>
  );
}

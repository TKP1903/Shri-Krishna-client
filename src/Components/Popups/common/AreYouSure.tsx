import * as React from "react";
import Popup from "reactjs-popup";

import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Item } from "../../../Components/common/mui";

const { useState, useRef } = React;

export default function AreYouSure({
  trigger,
  onConfirm,
  onCancel,
  close,
  title,
  message,
}: {
  trigger: any;
  onConfirm: any;
  onCancel?: any;
  title: string;
  message: string;
  close?: any;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<any>(null);
  const closePopup = () => {
    popupRef.current.close();
  };


  if (!onCancel) {
    onCancel = closePopup;
  }
  if (!close) {
    close = onCancel;
  }

  return (
    <Popup
      ref = {popupRef}
      open={isOpen}
      closeOnDocumentClick
      onClose={closePopup}
      trigger={trigger}
      modal
      nested
      contentStyle={{
        maxWidth: "400px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              {message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "#3f51b5",
                  },
                }}
                onClick={() => {
                  onConfirm();
                  close();
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "#3f51b5",
                  },
                }}
                onClick={() => {
                  // debugger;
                  closePopup();
                  onCancel();
                  close();
                }}
              >
                No
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Popup>
  );
}

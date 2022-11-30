import * as React from "react";
import Popup from "reactjs-popup";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

import { Close as CloseIcon } from "@mui/icons-material";

import { Item } from "../../../../../../Components/common/mui";
import { useVideosContext } from "../../../../../../helpers/VideosContext";
import { IndeterminateCheckBoxOutlined } from "@mui/icons-material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const { useState, useRef } = React;

type Video = {
  title: string;
  url?: string;
  file: File | null;
};

export default ({
  trigger,
  onCancel,
  close,
}: {
  trigger: any;
  onCancel?: any;
  close?: any;
}) => {
  const popupRef = useRef<any>(null);
  const closePopup = () => {
    if (popupRef.current?.close) popupRef.current.close();
  };
  if (!onCancel) {
    onCancel = closePopup;
  }
  if (!close) {
    close = closePopup;
  }
  const { videosUploading, queueVideo, cancelUpload } = useVideosContext();

  const titleRef = useRef<HTMLInputElement | null>(null);
  return (
    <Popup
      ref={popupRef}
      trigger={trigger}
      modal
      nested
      contentStyle={{
        // maxWidth: "400px",
        minHeight: "400px",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll",
      }}
    >
      {/* close icon */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={close}
      >
        <CloseIcon />
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
          }}
        >
          <Grid item xs={12}>
            <TextField
              inputRef={titleRef}
              sx={{ width: "100%" }}
              label="Video Title"
              variant="outlined"
              id="video-title"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              sx={{ width: "100%" }}
            >
              Add File
              <input
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    queueVideo({
                      title: titleRef.current?.value || file?.name,
                      file: file,
                    });
                  }
                }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              {!!videosUploading?.length ? (
                videosUploading.map((video, index) => (
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Typography>{video.video.title}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        variant="contained"
                        sx={{ width: "100%" }}
                        onClick={() => {
                          cancelUpload(index, video);
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        <strong>Status: </strong>
                        {video.status}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <LinearProgressWithLabel value={video?.progress || 0} />
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Typography>Uploading videos will appear here</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Popup>
  );
};

import * as React from "react";
// mui imports
import { Grid, Paper, Typography } from "@mui/material";

import { Player, CourseContents } from "../components";

import { useQuery } from "react-query";
import { SavedVideo } from "../../../../types";
import { PlayingVideoContext } from "../../../../helpers/PlayingVideoContext";

import { getVideoById } from "../../../../utils/api/videos";

const { useContext } = React;

export default function Classroom() {
  const { playingVideo: video, setPlayingVideo } =
    useContext(PlayingVideoContext);

  return (
    <Grid container spacing={1}>
      {/* Player */}
      <Grid item xs={12} md={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            aspectRatio: "16/9",
          }}
        >
          <Player />
        </Paper>
      </Grid>
      {/* CourseContents */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CourseContents />
        </Paper>
      </Grid>
    </Grid>
  );
}

import * as React from "react";
// mui imports
import { Grid, Paper, Typography } from "@mui/material";

import { Player, CourseContents } from "../components";

export default function MainContent() {
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
          <Player
            video={{
              title: "Video 1",
              embed: "https://dood.re/e/t9p153k2zzk47h22pvedxk8kzww02mri",
              description: "This is a video description",
              thumbnail: "https://i.ytimg.com/vi/7lCDEYXw3mM/hqdefault.jpg",
              // 1 hour 30 minutes in milliseconds
              duration: 5400000,
              views: 1000,
              likes: 100,
              dislikes: 10,
              comments: 20,
              publishedAt: "2021-10-10",
            }}
          />
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

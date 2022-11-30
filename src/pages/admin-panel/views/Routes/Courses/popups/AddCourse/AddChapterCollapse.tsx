import * as React from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  CssBaseline,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { ArrayElement, CourseData } from "../../../../../../../types";
import { useCollapsible } from "../../../../../../../utils/hooks/mui";

const { useState, useEffect, useContext } = React;
const theme = createTheme();

type Chapter = ArrayElement<
  ArrayElement<Pick<CourseData, "units">["units"]>["chapters"]
>;
const emptyChapter: Chapter = {
  title: "",
  description: "",
  videos: [],
};
type Video = {
  title: string;
  url?: string;
  file: File | null;
};
const emptyVideo: Video = {
  title: "",
  file: null,
};

export default ({
  chapterIndex,
  chapter,
}: {
  chapterIndex: number;
  chapter: Chapter;
}) => {
  const { Collapse, ExpandMore } = useCollapsible();
  const [videos, setVideos] = useState<Video[]>([]);
  const addVideo = () => {
    setVideos((prev) => {
      prev.push({ ...emptyVideo });
      return prev;
    });
  };
  return (
    <>
      <ExpandMore>
        <Typography variant="h6" gutterBottom component="div">
          Chapter {chapterIndex + 1}
        </Typography>
      </ExpandMore>
      <Collapse>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Chapter {chapterIndex + 1}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="chapterName"
                title="chapterName"
                label="Chapter Name"
                fullWidth
                autoComplete="chapter-title"
                value={chapter.title}
                onChange={(e) => {
                  chapter.title = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="chapterDescription"
                name="chapterDescription"
                label="Chapter Description"
                fullWidth
                autoComplete="chapter-description"
                value={chapter.description}
                onChange={(e) => {
                  chapter.description = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addVideo}>
                Add Video
              </Button>
              <Paper sx={{ p: 2, mt: 2 }}>
                {videos.length === 0 ? (
                  <Typography variant="h6" gutterBottom component="div">
                    No Videos Uploaded Yet
                  </Typography>
                ) : (
                  videos.map((video, videoIndex) => (
                    <Box key={videoIndex} sx={{ mt: 1 }}>
                      <Typography variant="h6" gutterBottom component="div">
                        Video {videoIndex + 1}
                      </Typography>
                      // upload video
                      <Button variant="contained" component="label">
                        Upload Video
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            if (!!e.target?.files) {
                              video.file = e.target.files[0];
                            }
                          }}
                        />
                      </Button>
                      <TextField
                        required
                        id="videoName"
                        name="videoName"
                        label="Video Name"
                        fullWidth
                        autoComplete="video-title"
                        value={video.title}
                        onChange={(e) => {
                          video.title = e.target.value;
                        }}
                      />
                    </Box>
                  ))
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  );
};

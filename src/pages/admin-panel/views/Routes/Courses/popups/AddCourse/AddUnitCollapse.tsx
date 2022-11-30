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
import AddChapterCollapse from "./AddChapterCollapse";

const { useState, useEffect, useContext } = React;
const theme = createTheme();

type Unit = ArrayElement<Pick<CourseData, "units">["units"]>;
type Chapter = ArrayElement<Pick<Unit, "chapters">["chapters"]>;
const emptyChapter: Chapter = {
  title: "",
  description: "",
  videos: [],
};

export default ({ unitIndex, unit }: { unitIndex: number; unit: Unit }) => {
  const { Collapse, ExpandMore } = useCollapsible();
  const [chapters, setChapters] = useState(unit.chapters);
  const addChapter = () => {
    setChapters((prev) => {
      prev.push({ ...emptyChapter });
      return prev;
    });
  };
  return (
    <>
      <ExpandMore />
      <Collapse>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Unit {unitIndex + 1}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <TextField
                required
                id="unitName"
                name="unitName"
                label="Unit Name"
                fullWidth
                autoComplete="unit-title"
                value={unit.title}
                onChange={(e) => {
                  unit.title = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={() => {
                  addChapter();
                }}
              >
                Add Chapter
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom component="div">
                Chapters
              </Typography>
              {chapters.map((chapter, chapterIndex) => (
                <AddChapterCollapse
                  chapterIndex={chapterIndex}
                  chapter={chapter}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  );
};

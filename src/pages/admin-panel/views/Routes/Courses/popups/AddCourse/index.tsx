import { useSnackbar } from "notistack";
import * as React from "react";
import Popup from "reactjs-popup";

import AddUnitCollapse from "./AddUnitCollapse";

import {
  Button,
  Drawer,
  Paper,
  Typography,
  Alert,
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { Close as CloseIcon } from "@mui/icons-material";
import { CourseData, ArrayElement } from "../../../../../../../types";

import { addOne as addCourse } from "../../../../../../../utils/api/courses";
import { useReload } from "../../../../../../../utils/hooks";

type CourseForm = Omit<
  CourseData,
  "createdAt" | "updatedAt" | "students" | "teachers" | "subjects"
>;

type Unit = ArrayElement<Pick<CourseData, "units">["units"]>;

const emptyUnit: Unit = {
  title: "",
  s_no: 0,
  chapters: [],
};

const theme = createTheme();

// From for adding new course
export default ({
  trigger,
  onConfirm,
  onCancel,
  close,
}: {
  trigger: any;
  onConfirm: any;
  onCancel?: any;
  close?: any;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const popupRef = React.useRef<any>(null);

  const closePopup = () => {
    popupRef.current.close();
  };

  if (!onCancel) {
    onCancel = closePopup;
  }
  if (!close) {
    close = onCancel;
  }

  const CourseDataRef = React.useRef<CourseForm>({
    title: "",
    description: "",
    price: 0,
    code: "",
    units: [],
  });
  const [Units, setUnits] = React.useState<Unit[]>([]);
  const reload = useReload();

  const updateUnit = (unitIndex: number, unitData: Unit) => {
    const units = CourseDataRef.current.units;
    if (unitIndex > Units.length) {
      units.length = unitIndex + 1;
    }
    units[unitIndex] = unitData;
  };

  const addUnit = () => {
    const newUnits = [...Units, { ...emptyUnit, s_no: Units.length + 1 }];
    CourseDataRef.current.units = newUnits;
    setUnits(newUnits);
  };

  React.useEffect(() => {
    console.log({
      RefUnits: CourseDataRef.current.units,
      Units,
    });
  }, [Units, CourseDataRef.current.units]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //   await onConfirm(courseName);
      enqueueSnackbar("Course added successfully", { variant: "success" });
      close();
    } catch (error: any) {
      enqueueSnackbar(error?.message || "Unknown error", { variant: "error" });
    }
  };

  return (
    <Popup
      ref={popupRef}
      onClose={closePopup}
      closeOnDocumentClick
      trigger={trigger}
      modal
      nested
    >
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
            <a
              className="close"
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                padding: "1rem",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                textDecoration: "none",
              }}
              onClick={close}
            >
              <CloseIcon />
            </a>
            <Typography component="h1" variant="h5">
              Add Course
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="courseName"
                label="Course Name"
                name="courseName"
                autoComplete="courseName"
                autoFocus
                inputRef={(ref) => {
                  if (ref) {
                    CourseDataRef.current.title = ref.value;
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="courseCode"
                label="Course Code"
                type="courseCode"
                id="courseCode"
                autoComplete="current-courseCode"
                inputRef={(ref) => {
                  if (ref) {
                    CourseDataRef.current.code = ref.value;
                  }
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                name="courseDescription"
                label="Course Description"
                type="courseDescription"
                id="courseDescription"
                autoComplete="current-courseDescription"
                rows={3}
                inputRef={(ref) => {
                  if (ref && ref.value) {
                    CourseDataRef.current.description = ref.value;
                  }
                }}
              />
              <Grid container>
                <Grid item xs={6}>
                  <Typography component="h1" variant="h5">
                    Units
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={addUnit}
                  >
                    Add Unit
                  </Button>
                </Grid>
                <Paper sx={{ p: 2, mt: 2 }}>
                  {Units &&
                    Units.map((unit, index) => (
                      <AddUnitCollapse
                        key={index}
                        unitIndex={index}
                        unit={unit}
                      />
                    ))}
                </Paper>
              </Grid>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Course
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </Popup>
  );
};

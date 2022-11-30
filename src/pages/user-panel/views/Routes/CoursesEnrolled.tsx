import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";

// mui imports
import { Grid, Paper, Typography, Drawer } from "@mui/material";

import { UserContext } from "../../../../helpers/UserDataContext";
import { CourseData } from "../../../../types";
import { getAll as getCourses } from "../../../../utils/api/courses";

const { useState, useEffect, useContext } = React;

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CourseData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, tokens } = useContext(UserContext);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const CancelTokenSource = CancelToken.source();
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setData(data);
      } catch (error: any) {
        setError(error?.message || "Unknown error");
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {
      CancelTokenSource.cancel();
    };
  }, []);

  return (
    <>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {/* Table of Courses */}
      <Typography variant="h4">Courses</Typography>
      <Grid container spacing={2}>
        {/* Table */}
        <Grid item xs={1}>
          <Paper>
            <Typography>S.no.</Typography>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <Typography>Course Name</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            <Typography>Course Code</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {/* edit button */}
          <Paper>
            <Typography>Edit</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {/* delete button */}
          <Paper>
            <Typography>Delete</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {/* expand button */}
          <Paper>
            <Typography>Expand</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

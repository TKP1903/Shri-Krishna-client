import axios from "axios";
import { useSnackbar } from "notistack";
import * as React from "react";

// mui imports
import { Box, Button, Grid, Paper, Typography, styled } from "@mui/material";

import SearchBox from "../../../../../Components/Header/SearchBox";
import { UserContext } from "../../../../../helpers/UserDataContext";
import { CourseData } from "../../../../../types";
import { getAll as getCourses } from "../../../../../utils/api/courses";
import { Item } from "../../../../../Components/common/mui";
import { AddCourse } from "./popups";

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
      {/* {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>} */}
      {/* Table of Courses */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <div
          style={{
            width: "80%",
          }}
        >
          <SearchBox />
        </div>

        <AddCourse
          trigger={
            <Button variant="contained" color="primary">
              Add Course
            </Button>
          }
          onConfirm={() => {
            enqueueSnackbar("Course Added", { variant: "success" });
          }}
          
        />
      </Box>
      <Grid container spacing={2}>
        {/* Table */}
        <Grid item xs={1}>
          <Item>
            <Typography>S.no.</Typography>
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item>
            <Typography>Name</Typography>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Typography>Price</Typography>
          </Item>
        </Grid>
      </Grid>
      {data?.map((course, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={1}>
            <Item>
              <Typography>{index + 1}</Typography>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item>
              <Typography>{course.title}</Typography>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Typography>{course.price}</Typography>
            </Item>
          </Grid>
          <Grid container xs={3}>
            <Grid item xs={6}>
              <Button variant="contained" color="primary">
                Delete
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary">
                Edit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

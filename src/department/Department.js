import React, { useEffect, useState } from "react";
import {
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import auth from "./../auth/auth-helper";
import { read } from "./api-department";
import { listByDepartment } from "./../job/api-jobs";
import { postListByDepartment } from "./../post/api-post";
import JobsByDepartment from "./../components/design-profile-department/JobsByDepartment";
import PostList from "../components/design-list/PostList";
import TransactionDepartment from "../components/design-transaction/department/TransactionDepartment";
import SnackError from "../errorHandler/SnackError";
import PostSkelaton from "../components/skelatons/PostSkelaton";
import ListSkelaton from "../components/skelatons/ListSkelaton";

const Department = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [department, setDepartment] = useState({});
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Loading Department Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ departmentId: match.params.departmentId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Department could not be uploaded."
        });
      } else {
        setDepartment(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  // Loading All Posts
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    postListByDepartment(
      { departmentId: match.params.departmentId },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts could not be uploaded."
        });
      } else {
        setPosts(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.departmentId]);

  // Loading Jobs
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listByDepartment({ departmentId: match.params.departmentId }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Jobs could not be uploaded."
          });
        } else {
          setJobs(data);
          setLoading(false);
        }
      }
    );
    return () => {
      abortController.abort();
    };
  }, [match.params.departmentId]);

  return (
    <Paper elevation={0} >
      <Box sx={{ m: 3, p: 2 }}>
        <Typography
          align="center"
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: 40,
            fontWeight: 500,
          }}
        >
          {department.name}
        </Typography>
      </Box>
      {matches ? (
        <Grid container spacing={1} sx={{ mt: 2, p: { xs: 1, md: 3, lg: 7 } }}>
          <Grid item md={7}>
          {loading ? (
                [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
              ) : (
                <PostList header="Latest Posts" posts={posts} />
              )}
          </Grid>
          <Grid item md={5}>
            <Stack spacing={1}>
            {loading ? <ListSkelaton /> : <JobsByDepartment jobs={jobs} />}
              {auth.isAuthenticated() &&
              auth.isAuthenticated().user.role === "admin" ? (
                <TransactionDepartment department={department} />
              ) : null}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1} sx={{ p: 2 }}>
         {loading ? <ListSkelaton /> : <JobsByDepartment jobs={jobs} />}
          {auth.isAuthenticated() &&
          auth.isAuthenticated().user.role === "admin" ? (
            <TransactionDepartment department={department} />
          ) : null}
          {loading ? (
            [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
          ) : (
            <PostList header="Latest Posts" posts={posts} />
          )}
        </Stack>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default Department;

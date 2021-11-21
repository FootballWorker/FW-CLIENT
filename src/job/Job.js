import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Box,
  Divider,
  IconButton,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import auth from "./../auth/auth-helper";
import { read, bestWorkers, vacantJobs } from "./api-jobs";
import { postListByJob } from "./../post/api-post";
import BestWorkers from "../components/design-profile-job/BestWorkers";
import VacantJobs from "../components/design-profile-job/VacantJobs";
import PostList from "../components/design-list/PostList";
import SnackError from "../errorHandler/SnackError";
import PageHeader from "./../components/header/PageHeader";
import Loading from "../components/loading/Loading";

const Job = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [job, setJob] = useState({});
  const [workers, setWorkers] = useState([]);
  const [vacants, setVacants] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Job Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ jobId: match.params.jobId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setJob(data);
          setLoading(false);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.jobId]);

  // Load Best Workers
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    bestWorkers({ jobId: match.params.jobId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setWorkers(data);
          setLoading(false);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.jobId]);

  // Load Vacant Jobs
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    vacantJobs({ jobId: match.params.jobId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setVacants(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.jobId]);

  // Load All Posts
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    postListByJob({ jobId: match.params.jobId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setPosts(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.jobId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper>
      <PageHeader header={job.title} />
      {matches ? (
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, p: { xs: 1, sm: 2, md: 3, lg: 7 } }}
        >
          <Grid item md={7} lg={8}>
            <Stack spacing={1}>
              {job.department && job.department.name !== "JOURNAL" && (
                <VacantJobs teams={vacants} />
              )}
              <PostList posts={posts} header="Latest Posts" />
            </Stack>
          </Grid>
          <Grid item md={5} lg={4}>
            <Stack spacing={1}>
              {auth.isAuthenticated() && jwt.user.role === "admin" ? (
                <Box
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    m: 1,
                    p: 2,
                  }}
                >
                  <Typography>Edit Job </Typography>
                  <Divider variant="middle" />
                  <Link to={"/job/edit/" + job._id}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Box>
              ) : null}
              <BestWorkers workers={workers} />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1} sx={{ m: 1 }}>
          {auth.isAuthenticated() && jwt.user.role === "admin" ? (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                m: 1,
                p: 1,
              }}
            >
              <Typography align="center">Edit Job </Typography>
              <Divider variant="middle" />
              <Link to={"/job/edit/" + job._id}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </Box>
          ) : null}
          {job.department && job.department.name !== "JOURNAL" && (
            <VacantJobs teams={vacants} />
          )}
          <BestWorkers workers={workers} />
          <PostList posts={posts} />
        </Stack>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default Job;

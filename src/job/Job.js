import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import auth from "./../auth/auth-helper";
import { read, bestWorkers, vacantJobs } from "./api-jobs";
import { postListByJob } from "./../post/api-post";
import BestWorkers from "../components/design-profile-job/BestWorkers";
import VacantJobs from "../components/design-profile-job/VacantJobs";
import PostList from "../components/design-list/PostList";
import SnackError from "../errorHandler/SnackError";
import PageHeader from "./../components/header/PageHeader";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import PostSkelaton from "../components/skelatons/PostSkelaton";

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
            error: "500 Server Error. Please try again.",
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
            error: "500 Server Error. Please try again.",
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
            error: "500 Server Error. Please try again.",
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
            error: "500 Server Error. Please try again.",
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

  return (
    <Paper elevation={0} >
      <PageHeader header={job.title} />
      {matches ? (
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, p: { xs: 1, sm: 2, md: 3, lg: 7 } }}
        >
          <Grid item md={7} lg={8}>
            <Stack spacing={1}>
              {loading ? (
                <ListSkelaton />
              ) : (
                job.department &&
                job.department.name !== "JOURNAL" && (
                  <VacantJobs teams={vacants} />
                )
              )}
              {loading ? (
                [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
              ) : (
                <PostList header="Latest Posts" posts={posts} />
              )}
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
              {loading ? <ListSkelaton /> : <BestWorkers workers={workers} />}
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
          {loading ? (
            <>
              <ListSkelaton />
              {[1, 2, 3, 4, 5].map((n) => (
                <PostSkelaton key={n} />
              ))}
            </>
          ) : (
            <>
              {job.department && job.department.name !== "JOURNAL" && (
                <VacantJobs teams={vacants} />
              )}
              <BestWorkers workers={workers} />
              <PostList posts={posts} />
            </>
          )}
        </Stack>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default Job;

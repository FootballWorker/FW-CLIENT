import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@mui/material";

import auth from "./../auth/auth-helper";
import { listJobs } from "./api-jobs";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteJob from "./DeleteJob";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";
import ListHeader from "../components/header/ListHeader";






export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });


  useEffect(() => {
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;
    setLoading(true);

    listJobs(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setJobs(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  const removeJob = (job) => {
    const updatedJobs = [...jobs];
    const index = updatedJobs.indexOf(job);
    updatedJobs.splice(index, 1);
    setJobs(updatedJobs);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={12}>
      <ListHeader header="Jobs" />
      <Divider />
      <List dense>
        {jobs &&
          jobs.map((item, i) => {
            return (
              <ListItem button key={i}>
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <Link to={"/jobs/" + item._id}>
                      <ArrowForwardIcon />
                    </Link>
                  </IconButton>
                  {auth.isAuthenticated().user.role === "admin" && (
                    <DeleteJob job={item} onRemove={removeJob} />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

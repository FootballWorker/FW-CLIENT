import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import auth from "./../auth/auth-helper";
import { list } from "./api-match.js";
import DeleteMatch from "./DeleteMatch";
import SnackError from "../errorHandler/SnackError";
import ListHeader from "../components/header/ListHeader";
import ListSkelaton from "../components/skelatons/ListSkelaton";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Matches could not be uploaded.",
        });
      } else {
        setMatches(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  const removeMatch = (match) => {
    const updatedMatches = [...matches];
    const index = updatedMatches.indexOf(match);
    updatedMatches.splice(index, 1);
    setMatches(updatedMatches);
  };

  return (
    <Paper elevation={12}>
      <ListHeader header="Matches" />
      {loading ? (
        <ListSkelaton />
      ) : (
        <List dense>
          <Grid container spacing={2} sx={{ p: { xs: 1, md: 3, lg: 5 } }}>
            {matches?.length > 0 ? (
              matches.map((item, i) => {
                return (
                  <Grid key={i} item xs={12} md={6} lg={4}>
                    <ListItem button>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          "Season : " +
                          item.season +
                          "    ----   " +
                          "  Section : " +
                          item.section
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <Link to={"/matches/" + item._id}>
                            <ArrowForwardIcon />
                          </Link>
                        </IconButton>
                        {auth.isAuthenticated() &&
                          auth.isAuthenticated().user.role === "admin" && (
                            <DeleteMatch match={item} onRemove={removeMatch} />
                          )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                );
              })
            ) : (
              <Grid xs={12}>
                <Typography align="center">No match found.</Typography>
              </Grid>
            )}
          </Grid>
        </List>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";

import auth from "./../auth/auth-helper";
import { list } from "./api-team";

import { ArrowForward } from "@mui/icons-material";
import DeleteTeam from "./DeleteTeam";
import SnackError from "../errorHandler/SnackError";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import ListHeader from "../components/header/ListHeader";
import kFormatter from "../components/numbers";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  useEffect(() => {
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;
    setLoading(true);

    list(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Teams could not be uploaded."
        });
      } else {
        setTeams(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  const removeTeam = (team) => {
    const updatedTeams = [...teams];
    const index = updatedTeams.indexOf(team);
    updatedTeams.splice(index, 1);
    setTeams(updatedTeams);
  };

  return (
    <Paper elevation={4}>
      {loading ? (
        <ListSkelaton />
      ) : (
        <>
          <ListHeader header="Teams" />
          <List dense>
            <Grid container spacing={2}>
              {teams.map((item, i) => {
                return (
                  <Grid key={i} item xs={12} md={6} lg={4}>
                    <ListItem button>
                      <ListItemText
                        primary={item.name}
                        secondary={
                          "Members : " + kFormatter(item?.members?.length)
                        }
                      />
                      <ListItemSecondaryAction>
                        {auth.isAuthenticated() &&
                          auth.isAuthenticated().user.role === "admin" && (
                            <DeleteTeam team={item} onRemove={removeTeam} />
                          )}
                        <IconButton>
                          <Link to={"/teams/" + item._id}>
                            <ArrowForward />
                          </Link>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                );
              })}
            </Grid>
          </List>
        </>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

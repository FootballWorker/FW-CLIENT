import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import auth from "./../auth/auth-helper";
import { list } from "./api-player";

import DeletePlayer from "./DeletePlayer";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Players Data
  useEffect(() => {
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;
    setLoading(true);

    list({ t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setPlayers(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  // Delete Player by Editing
  const removePlayer = (player) => {
    const updatedPlayers = [...players];
    const index = updatedPlayers.indexOf(player);
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  if (redirect) {
    return <Redirect to="/signin" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={12}>
      <Typography
        align="center"
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          pt: 1,
          fontFamily: "Raleway",
          fontWeight: 700,
        }}
      >
        Whole Players
      </Typography>
      <Divider />
      <List dense>
        <Grid container spacing={2}>
          {players && players.length > 0 && (
            players.map((item, i) => {
              return (
                <Grid key={i} item xs={12} md={6} lg={4}>
                  <ListItemButton>
                    <Link to={"/players/" + item._id} key={i}>
                      <ListItemText
                        primary={item.name}
                        secondary={item.team && "Team : " + item.team.name}
                      />
                    </Link>
                    <ListItemSecondaryAction>
                      {auth.isAuthenticated().user.role === "admin" && (
                        <DeletePlayer player={item} onRemove={removePlayer} />
                      )}
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </Grid>
              );
            })
          )}
        </Grid>
      </List>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

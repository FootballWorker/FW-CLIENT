import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import auth from "./../auth/auth-helper";
import { followers } from "./api-user";
import {config} from "./../config/config";
import SnackError from "../errorHandler/SnackError";
import ListSkelaton from "../components/skelatons/ListSkelaton";

export default function Followers({ match }) {
  const [users, setUsers] = useState([]);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    followers({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data?.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Followers could not be uploaded."
          });
        } else {
          setUsers(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  return (
    <Paper
      elevation={0}
      sx={{
        margin: { xs: 0.1, sm: 2, md: 3, lg: 5 },
        p: { xs: 1, sm: 2, md: 3, lg: 14 },
      }}
    >
      {loading ? (
        <ListSkelaton />
      ) : (
        <div>
          <Typography
            align="center"
            variant="h4"
            gutterBottom
            sx={{
              p: 3,
              fontWeight: "bold",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Followers
          </Typography>
          <Divider variant="middle" />
          <List sx={{ margin: "auto", maxWidth: 600 }}>
            {users &&
              users.length > 0 &&
              users.map((item, i) => (
                <ListItemButton key={i}>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        item.photo &&
                        config.ServerURI + "/users/photo/" + item._id
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <ListItemSecondaryAction>
                      <Link to={"/users/" + item._id}>
                        <ArrowForwardIcon />
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItemSecondaryAction>
                </ListItemButton>
              ))}
          </List>
        </div>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

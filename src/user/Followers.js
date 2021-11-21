import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import auth from "./../auth/auth-helper";
import { followers } from "./api-user";
import config from "./../config/config";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";


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
            error: data.error,
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

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={4} sx={{ margin: {xs:1,sm:2,md:3,lg:5}, p: {xs:1,sm:2,md:3,lg:14} }}>
      <Typography align="center" variant="h5" gutterBottom>
        Followers
      </Typography>
      <Divider variant="middle" />
      <List>
        {users &&
          users.length > 0 &&
          users.map((item, i) => (
            <ListItemButton key={i}>
              <ListItemAvatar>
                <Avatar
                  src={
                    item.photo &&
                    config.ServerURI + "/api/users/photo/" + item._id
                  }
                />
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
              <ListItemSecondaryAction>
                <Link to={"/users/"+item._id} >
                  <ArrowForwardIcon />
                </Link>
              </ListItemSecondaryAction>
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
      </List>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

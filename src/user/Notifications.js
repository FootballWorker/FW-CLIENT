import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { listNtf, removeAll, removeNtf, listUnread } from "./api-user.js";
import auth from "./../auth/auth-helper";
import {
  Button,
  Grid,
  IconButton,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  Divider,
  ListItemButton,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Delete from "@mui/icons-material/Delete";

import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";
import PageHeader from "../components/header/PageHeader.js";

export default function Notifications({ match }) {
  const history = useHistory();
  const [ntf, setNtf] = useState([]);
  const [ntfs, setNtfs] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNtf({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setNtf(data);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  useEffect(() => {
    setLoading(true);
    listUnread({ t: jwt.token }).then((data) => {
      if (data && data.error) {
        setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
      } else {
        setNtfs(data);
        setLoading(false);
      }
    });
  }, []);

  // Delete Notification
  const removeNotifcation = (notf) => {
    const updatedNtf = [...ntf];
    const index = updatedNtf.indexOf(notf);
    updatedNtf.splice(index, 1);
    setNtf(updatedNtf);
  };

  const removeWhole = () => {
    setProgress(true);
    removeAll({ t: jwt.token }).then((data) => {
      if (data && data.error) {
        setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        setProgress(false);
      } else {
        setProgress(false);
        window.location.reload(false);
        setRedirect(true);
      }
    });
  };

  const remove = (item) => {
    setProgress(true);
    removeNtf({ notificationId: item._id }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
      } else {
        removeNotifcation(item);
        setOpen(false);
        setProgress(false);
      }
    });
  };

  // Cancel Delete Request API
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to={"/users/" + match.params.userId} />;
  }

  if (jwt.user._id !== match.params.userId) {
    return <Redirect to="/home" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={12} sx={{ m: {xs:1,sm:2,md:5,lg:9} }}>
      <PageHeader header="Notifications" />
      <Grid container>
        <Grid xs={12} md={6}>
          <Typography align="center" sx={{fontSize:{xs:11,md:17}}} >
            {"You have got " +
              (ntfs ? ntfs.length : 0) +
              " unread notifications in total of " +
              (ntf ? ntf.length : 0) +
              "."}
          </Typography>
        </Grid>
        <Grid xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={removeWhole}>
            Delete All
            <Delete />
          </Button>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <List sx={{ margin: "auto", maxWidth: "100%" }}>
        {ntf &&
          ntf.map((item, i) => (
            <ListItemButton
              key={i}
              onClick={() => history.push(`/notifications/${item._id}`)}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: item.status ? "light" : "bold",
                      fontSize: { xs: 12, md: 20 },
                    }}
                  >
                    {"From : " + item.from}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      mr: 9,
                      wordBreak: "break-all",
                      wordWrap: "break-word",
                      flexWrap: "wrap",
                      fontSize: { xs: 10, md: 18 },
                      fontWeight: item.status ? "light" : 500,
                    }}
                  >
                    {item.title && item.title.length > 70
                      ? item.title.substring(0, 70) + "..."
                      : item.title}
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ fontSize: { xs: 10, md: 18 } }}>
                  {new Date(item.created).toLocaleDateString()}
                </Typography>
                <IconButton onClick={() => setOpen(true)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
      </List>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Notification</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={remove} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

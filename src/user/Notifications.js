import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { format } from 'timeago.js'
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Delete from "@mui/icons-material/Delete";

import auth from "./../auth/auth-helper";
import { listNtf, removeAll, removeNtf, listUnread } from "./api-user.js";
import SnackError from "../errorHandler/SnackError";
import ListSkelaton from "../components/skelatons/ListSkelaton.js";
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
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Please try again.",
          });
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
          error: "500 Server Error. Please try again.",
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
            error: "500 Server Error. Please try again.",
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
            error: "500 Server Error. Please try again.",
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


  return (
    <Paper elevation={1} sx={{ m: { xs: 1, sm: 2, md: 5, lg: 9 } }}>
      {loading ? (
        <ListSkelaton />
      ) : (
        <div>
          <PageHeader header="Notifications" />
          <Grid container>
            <Grid xs={12} md={6}>
              <Typography align="center" sx={{ fontSize: { xs: 11, md: 17 } }}>
                {"You have got " +
                  (ntfs ? ntfs.length : 0) +
                  " unread notifications in total of " +
                  (ntf ? ntf.length : 0) +
                  "."}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
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
                  onClick={() => {
                    history.push(`/notifications/${item._id}`);
                    window.location.reload(false);
                  }}
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
                      {format(item.created)}
                    </Typography>
                    <IconButton onClick={() => setOpen(true)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItemButton>
              ))}
          </List>
        </div>
      )}
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

import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import auth from "./../../../auth/auth-helper";
import { sendNtf } from "./../../../user/api-user";
import SnackError from '../../../errorHandler/SnackError.js';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendingNtf(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [values, setValues] = useState({
    text: "",
    title: "",
    link: ""
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    const ntf = {
      text: values.text || undefined,
      title: values.title || undefined,
      link: values.link || undefined,
    };

    sendNtf({ userId: props.user._id }, { t: jwt.token }, ntf).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Notification could not be sent."
        });
      } else {
        setOpen(false);
        setRedirect(true)
      }
    });
  };

  if(redirect){
    return <Redirect to="/home" />
  }

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      <IconButton onClick={handleClickOpen}>
        <NotificationAddIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Sending Message to " + props.user.name}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            value={values.title}
            onChange={handleChange("title")}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            type="text"
            value={values.link}
            onChange={handleChange("link")}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Texting"
            type="text"
            value={values.text}
            onChange={handleChange("text")}
            fullWidth
            multiline
            rows={10}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

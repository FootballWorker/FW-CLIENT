import React , { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from './../auth/auth-helper.js'
import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";
import SnackError from "../errorHandler/SnackError.js";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated()
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  const clickButton = ()=> {
    setOpen(true)
  }

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deleteAccount = () => {
    setProgress(true);
    remove({
      userId : props.userId
    },{t: jwt.token}).then((data)=>{
      if(data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      }else {
        auth.clearJWT(()=>console.log('deleted'))
        setProgress(false);
        setRedirect(true)
      }
    })
  }


  if (redirect) {    
    return <Redirect to='/'/>
  }

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="primary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
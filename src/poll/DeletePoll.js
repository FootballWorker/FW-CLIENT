import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from "@mui/icons-material/Delete";
import {remove} from "./api-poll"
import auth from "../auth/auth-helper"
import SnackError from "../errorHandler/SnackError";


const DeletePoll = (props) => {
  const [open, setOpen] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated()

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const deletePoll = () => {
    remove({ pollId: props.pollId }, { t: jwt.token }).then(
      (data) => {
        if (data?.error) {
          setIsError({ ...isError, openSnack: true, error: "500 Server Error. Poll could not be deleted." });
        } else {
          setRedirect(true);
        }
      }
    );
  };

  if(redirect){
    return <Redirect to="/" />
  }

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 1,
        }}
      >
        <Typography>Delete Poll</Typography>
        <Divider />
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Poll</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete this poll.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deletePoll}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <SnackError open={isError.openSnack} text={isError.error} />
    </>
  );
};

export default DeletePoll;

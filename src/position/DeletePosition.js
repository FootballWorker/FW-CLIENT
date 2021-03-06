import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from "@mui/icons-material/Delete";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { remove } from "./api-position";
import SnackError from "../errorHandler/SnackError.js";

export default function DeletePosition(props) {
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  // Ooen Delete Card API
  const clickButton = () => {
    setOpen(true);
  };

  // Delete Shop API
  const deletePosition = () => {
    setProgress(true);
    remove({ positionId: props.position._id }, { t: jwt.token }).then(
      (data) => {
        if (data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Position could not be deleted."
          });
        } else {
          props.onRemove(props.position);
          setOpen(false);
          setProgress(false);
        }
      }
    );
  };

  // Cancel Delete Request API
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Position</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this position.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deletePosition}
            color="secondary"
            autoFocus="autoFocus"
          >
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
    </span>
  );
}

DeletePosition.propTypes = {
  position: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

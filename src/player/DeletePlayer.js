import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { remove } from "./api-player";
import SnackError from "../errorHandler/SnackError.js";

export default function DeletePlayer(props) {
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
  const deletePlayer = () => {
    setProgress(true);
    remove({ playerId: props.player._id }, { t: jwt.token }).then(
      (data) => {
        if (data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Player could not be deleted."
          });
        } else {
          props.onRemove(props.player);
          setProgress(false);
          setOpen(false);
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
      <IconButton onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Player</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete this player.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deletePlayer}
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

DeletePlayer.propTypes = {
  player: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

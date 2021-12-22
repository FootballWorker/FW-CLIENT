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

import auth from "./../auth/auth-helper.js";
import { remove } from "./api-news";
import SnackError from "../errorHandler/SnackError.js";

export default function DeleteNews(props) {
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  // Delete Shop API
  const deleteNews = () => {
    remove({ newsId: props.news._id }, { t: jwt.token }).then((data) => {
      if (data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. News could not be deleted."
        });
      } else {
        setOpen(false);
        props.onRemove(props.news);
      }
    });
  };

  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to Delete This News</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteNews} color="secondary" autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

DeleteNews.propTypes = {
  news: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

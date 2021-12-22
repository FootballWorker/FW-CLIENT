import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";

import auth from "./../auth/auth-helper.js";
import { remove } from "./api-attribute";
import SnackError from "../errorHandler/SnackError.js";

export default function DeleteAttribute(props) {
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  // Ooen Delete Card API
  const clickButton = () => {
    setOpen(true);
  };

  // Delete Shop API
  const deleteAttribute = () => {
    remove({ attributeId: props.attribute._id }, { t: jwt.token }).then(
      (data) => {
        if (data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error! Attribute could not be deleted.",
          });
        } else {
          setOpen(false);
          props.onRemove(props.attribute);
        }
      }
    );
  };

  // Cancel Delete Request API
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>Delete Attribute</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete this attribute.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAttribute}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

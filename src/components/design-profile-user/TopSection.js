import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";

import Star from "./../../assets/images/back6.jpg";
import {config} from "../../config/config";
import auth from "../../auth/auth-helper";
import { updateBackground } from "../../user/api-user";

export default function TopSection(props) {
  const [background, setBackground] = useState("");
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "background" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setBackground(value);
  };

  const clickSubmit = () => {
    let userData = new FormData();
    background && userData.append("background", background);

    updateBackground(
      { userId: props.user?._id },
      { t: jwt.token },
      userData
    ).then((data) => {
      if (data && data.error) {
        props.setIsError({
          ...props.isError,
          open: true,
          error: "You are not allowed"
        })
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <Box sx={{ maxWidth: "100%", height: 150, position: "relative" }}>
      <img
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
        src={
          props.user.background
            ? config.ServerURI + "/api/users/background/" + jwt.user?._id
            : Star
        }
        alt="Background"
        loading="lazy"
      />
      {jwt.user?._id === props.user?._id && (
        <Tooltip title="Change Background Photo">
          <IconButton
            color="secondary"
            sx={{ position: "absolute", top: "1%", right: 0 }}
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle align="center">Change Background Photo</DialogTitle>
        <DialogContent
          sx={{ p: 4, textAlign: "center", justifyContent: "center" }}
        >
          <DialogContentText sx={{ p: 1 }}>
            {" "}
            Changing Photo might take some time. Wait for it , please.{" "}
          </DialogContentText>
          <input
            accept="image/*"
            onChange={handleChange("background")}
            style={{
              display: "none",
            }}
            id="background"
            type="file"
          />
          <label htmlFor="background">
            <Button component="span" variant="contained" sx={{ mb: 2 }}>
              Upload
              <ImageIcon />
            </Button>
          </label>
          <Typography>{background ? background.name : ""}</Typography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Avatar
        src={
          props.user.photo &&
          config.ServerURI + "/api/users/photo/" + props.user._id
        }
        sx={{
          position: "absolute",
          left: "4%",
          bottom: { xs: "-50px", md: "-80px", lg: "-100px" },
          width: { xs: 100, md: 140, lg: 170 },
          height: { xs: 100, md: 140, lg: 170 },
        }}
      />
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          bottom: { xs: "-40px", sm: "-40px", md: "-50px", lg: "-70px" },
          left: { xs: 130, sm: 150, md: 180, lg: 230 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, lg: 33 },
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: "bold",
          }}
        >
          {props.user?.name}
        </Typography>
      </Box>
    </Box>
  );
}

TopSection.propTypes = {
  user: PropTypes.object.isRequired,
};

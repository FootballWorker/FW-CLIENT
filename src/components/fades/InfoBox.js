import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, md: 400 },
  bgcolor: "background.paper",
  border: "2px solid #51545b",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function InfoBox(props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            align="center"
            gutterBottom
            variant="h6"
            component="h2"
          >
            Information & Rules
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {props.textOne}
          </Typography>
          {props.textTwo && (
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.textTwo}
            </Typography>
          )}
          {props.textThree && (
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.textThree}
            </Typography>
          )}
          {props.textFour && (
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.textFour}
            </Typography>
          )}
          {props.textFive && (
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.textFive}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}

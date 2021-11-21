import React,{useState} from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from '@mui/material/Typography';
import CancelButton from "../components/design-button/CancelButton";
import WebSiteLink from "../components/design-button/WebSiteLink";

export default function AuthenticationError(props) {
  const [open, setOpen] = useState(props.open)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(!props.open);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Typography align="center" arinat="h6">
          ATTENTION
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This Operation Needs Your Credentials! What Are You Waiting To Become
          FOOTBALL WORKER!
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CancelButton onClick={handleClose} text="Cancel" />
        <WebSiteLink link="/" text="Join Us Now" />
      </DialogActions>
    </Dialog>
  );
}

AuthenticationError.propTypes = {
  open: PropTypes.bool
};

import React ,{useState} from 'react'
import PropTypes from 'prop-types'

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function SnackError(props) {
  const [open, setOpen] = useState(props.open);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(!open);
  };


  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {props.text}
      </Alert>
    </Snackbar>
  );
}


SnackError.propTypes = {
  open : PropTypes.bool.isRequired,
  text : PropTypes.string.isRequired
}
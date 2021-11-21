import React from 'react'
import PropTypes from 'prop-types'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function FormError(props) {
  return (
    <Alert severity="error">
      <AlertTitle  >Error</AlertTitle>
      {props.text}
    </Alert>
  );
}


FormError.propTypes = {
  text: PropTypes.string
}
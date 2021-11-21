import * as React from "react";
import PropTypes from 'prop-types'
import Box from "@mui/material/Box";

export default function CancelButton(props) {
  return (
    <Box
      onClick={props.onClick}
      sx={{
        p: {
          xs: 0.5,
          sm: 0.9,
        },
        maxWidth: 120,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "7px",
        bgcolor: "#51545B",
        color: "#FED829",
        fontWeight: "bold",
        fontSize: {
          xs: 12,
          md: 14,
          lg: 17
        },
        fontFamily: "Monospace",
        letterSpacing: 3,
      }}
    >
      {props.text}
    </Box>
  );
}


CancelButton.propTypes = {
  onClick : PropTypes.func,
  text: PropTypes.string
}

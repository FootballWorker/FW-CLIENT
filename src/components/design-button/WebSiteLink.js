import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

export default function WebSiteLink(props) {
  return (
    <Link to={props.link}>
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 1.9,
          },
          maxWidth: 300,
          textAlign: "center",
          cursor: "pointer",
          borderRadius: "10px",
          color: grey[100],
          backgroundImage: "linear-gradient(10deg,grey,#FED829 )",
          ":hover": {
            backgroundImage: "linear-gradient(10deg,grey , Lime  )",
            color: "##FFE4C4",
          },
          fontWeight: "bold",
          fontSize: {
            xs: 11,
            md: 14,
            lg: 17,
          },
          fontFamily: "Monospace",
          letterSpacing: 3,
        }}
      >
        {props.text}
      </Box>
    </Link>
  );
}

WebSiteLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
};

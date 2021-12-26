import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

export default function ListHeader(props) {
  return (
    <Typography
      align="center"
      variant="h5"
      gutterBottom
      component="div"
      sx={{
        mt:0.5,
        p: 1,
        fontFamily: "Raleway",
        fontWeight: 700,
        bgcolor:'#51545B',
        borderTopLeftRadius:'5px',
        borderTopRightRadius:'5px'
      }}
      color="secondary"
    >
      {props.header}
    </Typography>
  );
}

ListHeader.propTypes = {
  header : PropTypes.string
}
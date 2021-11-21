import React from 'react'
import PropTypes from "prop-types";
import { Box, Divider, IconButton, Typography } from '@mui/material'
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";


export default function TransactionAudience(props) {
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      <Typography>
        Become Audience
      </Typography>
      <Divider />
      {props.audience ? (
        <IconButton
          onClick={props.becomeAudience}
          aria-label="Audience"
          color="primary"
        >
          <EventSeatRoundedIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={props.becomeAudience}
          aria-label="Disaudience"
          color="secondary"
        >
          <EventSeatOutlinedIcon />
        </IconButton>
      )}
    </Box>
  );
}

TransactionAudience.propTypes = {
  audience : PropTypes.bool,
  becomeAudience : PropTypes.func
}
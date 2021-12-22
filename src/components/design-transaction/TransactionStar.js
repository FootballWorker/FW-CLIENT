import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import kFormatter from '../numbers';


export default function TransactionStar (props){

  return (
    <Box
      sx={{
        m: 1,
        p: 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {props.stars ? (
        <IconButton
          onClick={props.clickLike}
          aria-label="audience"
          color="star"
        >
          <StarIcon sx={{ mr: 0.5 }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={props.clickLike}
          aria-label="unstar"
          color="secondary"
        >
          <StarBorderIcon sx={{ mr: 0.5 }} />
        </IconButton>
      )}
      <Typography sx={{
        fontSize: {
          xs: 8,
          sm: 12,
          md: 16
        }
      }} >{kFormatter(props.starLength)}</Typography>
    </Box>
  );
}


TransactionStar.propTypes = {
  clickLike: PropTypes.func.isRequired,
  starLength: PropTypes.number
}
import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function PageHeader(props) {
  return (
    <Box sx={{ m: 3, p: 1.5 }}>
      <Typography
        align="center"
        sx={{
          fontFamily: "'Merriweather', serif",
          fontSize: {xs:25,md:35},
          fontWeight: 500,
        }}
      >
        {props.header && props.header.toUpperCase()}
      </Typography>
    </Box>
  );
}


PageHeader.propTypes = {
  header: PropTypes.string.isRequired
}

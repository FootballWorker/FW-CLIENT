import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import zxcvbn from 'zxcvbn'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PasswordSecure({password}) {
  const test = zxcvbn(password)
  const num = test.score * 100/4

  const label = () => {
    switch (test.score) {
      case 0:
        return '';
      case 1:
        return 'weak';
      case 2:
        return 'fear';
      case 3:
        return 'good';
      case 4:
        return 'strong';
      default:
        return 'none';
    }
  }

  const progressColor = () => {
    switch (test.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9Bc158';
      case 4:
        return '#00B500';
      default:
        return 'none';
    }
  }

  const changePasswordColor = () => ({
    width: `${num}%`,
    height: '7px',
    borderRadius: '5px',
    background:progressColor
  })

  return (
    <Box sx={{
      width:'100%',
      textAlign:'right'
    }} >
      <Typography align="left" color="InfoBackground" gutterBottom variant="body2" >{password?.length > 6 ? <CheckCircleIcon fontSize="small" color="success"/>  : "- 6 characters at least"} </Typography>
      <Box sx={changePasswordColor} />
      <Typography color={progressColor} > {label()} </Typography>
    </Box>
  )
}

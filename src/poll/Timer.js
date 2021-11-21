import React, { useState, useEffect } from "react";
import { Typography , Box } from "@mui/material";



const calculateTimeLeft = (date) => {
  const difference = date - new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false
    }
  } else {
      timeLeft = {timeEnd: true}
  }
  return timeLeft
}

export default function Timer(props) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(props.endTime)))

  useEffect(() => {
    let timer = null
    if(!timeLeft.timeEnd){
      timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft(new Date(props.endTime)))
      }, 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  })


  return (
    <Box sx={{m:3,textAlign:'center'}}>
      <Typography align="center" sx={{fontSize:{xs:15,sm:18,md:21},fontFamily:"Raleway" }} > Remaining Time </Typography>
      {!timeLeft.timeEnd ? (
        <Typography variant="h5" sx={{fontFamily: "'Quicksand', sans-serif"}} >
          {timeLeft.days !== 0 && `${timeLeft.days} d `}
          {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`}
        </Typography>
      ) : (
        <Typography component="p" variant="h6">
          Poll is Ended !
        </Typography>
      )}
    </Box>
  );
}


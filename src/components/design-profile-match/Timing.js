import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { format } from "timeago.js";

const calculateTimeLeft = (date) => {
  const difference = date - new Date();
  let timeLeft = {};

  if (parseInt(difference) > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false,
    };
  } else {
    timeLeft = { timeEnd: true };
  }
  return timeLeft;
};

export default function Timing(props) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(props.endTime))
  );

  useEffect(() => {
    let timer = null;
    if (!timeLeft.timeEnd) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(new Date(props.endTime)));
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  });


  return (
    <Box
      sx={{
        margin: "16px",
        color: "#fff",
      }}
    >
      {!timeLeft.timeEnd && timeLeft.days === 0 ? (
        <div>
          <Typography
            color="silver"
            sx={{
              fontSize: {
                xs: 8,
                sm: 15,
                md: 17,
              },
              fontWeight: "light",
              fontFamily: "Orbitron",
            }}
          >
            {timeLeft.hours !== 0 && `${timeLeft.minutes} h `}
            {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
            {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`}
          </Typography>
        </div>
      ) : (
        <Typography
          color="secondary"
          sx={{
            fontSize: {
              xs: 8,
              sm: 15,
              md: 17,
            },
            fontWeight: "light",
            fontFamily: "Orbitron",
          }}
        >
          {format(props.endTime)}
        </Typography>
      )}
    </Box>
  );
}

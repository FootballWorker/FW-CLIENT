import React from "react";
import Box from "@mui/material/Box";

import CancelButton from "../../design-button/CancelButton";
import { fireCoach, fireScout, fireYouth } from "./../../../team/api-team";

export default function TransactionAppointmentForManager(props) {
  const fireCoachClick = () => {
    props.firingTeam(fireCoach);
  };

  const fireScoutClick = () => {
    props.firingTeam(fireScout);
  };

  const fireYouthClick = () => {
    props.firingTeam(fireYouth);
  };

  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      {props.user.team &&
        props.manager?.team &&
        props.user?.job?.title === "coach" &&
        props.user.team?._id === props.manager.team._id && (
          <CancelButton onClick={fireCoachClick} text="Fire Coach" />
        )}
      {props.user.team &&
        props.manager?.team &&
        props.user?.job?.title === "scout" &&
        props.user.team?._id === props.manager.team._id && (
          <CancelButton onClick={fireScoutClick} text="Fire Scout" />
        )}
      {props.user.team &&
        props.manager?.team &&
        props.user?.job?.title === "youth" &&
        props.user.team?._id === props.manager.team._id && (
          <CancelButton onClick={fireYouthClick} text="Fire Youth" />
        )}
    </Box>
  );
}

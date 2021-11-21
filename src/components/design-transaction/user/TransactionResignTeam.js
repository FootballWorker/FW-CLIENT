import React from "react";
import Box from "@mui/material/Box";

import CancelButton from "../../design-button/CancelButton";
import {
  firePresident,
  fireVice,
  fireManager,
  fireCoach,
  fireScout,
  fireYouth,
} from "../../../team/api-team";

export default function TransactionResignTeam(props) {
  const firePresidentClick = () => {
    props.firingTeam(firePresident);
  };

  const fireVicePresidentClick = () => {
    props.firingTeam(fireVice);
  };

  const fireManagerClick = () => {
    props.firingTeam(fireManager);
  };

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
      {props.user?.job?.title === "president" && (
        <CancelButton onClick={firePresidentClick} text="Resign" />
      )}
      {props.user?.job?.title === "vice president" && (
        <CancelButton onClick={fireVicePresidentClick} text="Resign" />
      )}
      {props.user?.job?.title === "manager" && (
        <CancelButton onClick={fireManagerClick} text="Resign" />
      )}
      {props.user?.job?.title === "coach" && (
        <CancelButton onClick={fireCoachClick} text="Resign" />
      )}
      {props.user?.job?.title === "scout" && (
        <CancelButton onClick={fireScoutClick} text="Resign" />
      )}
      {props.user?.job?.title === "youth" && (
        <CancelButton onClick={fireYouthClick} text="Resign" />
      )}
    </Box>
  );
}

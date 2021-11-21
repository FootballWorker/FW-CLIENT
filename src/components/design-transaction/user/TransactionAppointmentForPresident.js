import React from "react";
import Box from "@mui/material/Box";

import CancelButton from "../../design-button/CancelButton";
import { fireVice, fireManager } from "./../../../team/api-team";

export default function TransactionAppointmentForPresident(props) {
  const fireVicePresidentClick = () => {
    props.firingTeam(fireVice);
  };

  const fireManagerClick = () => {
    props.firingTeam(fireManager);
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
        props.user?.job?.title === "vice president" &&
        props.user.team?._id === props.president.team?._id && (
          <CancelButton
            onClick={fireVicePresidentClick}
            text="Fire Vice President"
          />
        )}
      {props.user.team &&
        props.user?.job?.title === "manager" &&
        props.user?.team?._id === props.president?.team?._id && (
          <CancelButton onClick={fireManagerClick} text="Fire Manager" />
        )}
    </Box>
  );
}

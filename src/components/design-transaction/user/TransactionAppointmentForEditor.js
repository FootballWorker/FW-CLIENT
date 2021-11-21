import React from "react";
import Box from "@mui/material/Box";

import CancelButton from "../../design-button/CancelButton";
import { fireEmployee } from "./../../../news/api-news";

export default function TransactionAppointmentForEditor(props) {
  const fire = () => {
    props.employeeButton(fireEmployee);
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
      {props.user.news && props.editor?.news?._id === props.user?.news?._id && (
        <CancelButton onClick={fire} text="Fire Journalist" />
      )}
    </Box>
  );
}

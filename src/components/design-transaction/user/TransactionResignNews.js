import React from "react";
import Box from "@mui/material/Box";


import CancelButton from "../../design-button/CancelButton";
import { fireEmployee, fireEditor } from "./../../../news/api-news";

export default function TransactionResignNews(props) {
  const fire = () => {
    props.employeeButton(fireEmployee);
  };

  const fireEdit = () => {
    props.employeeButton(fireEditor);
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
      {props.user?.job?.title === "editor" ? (
        <CancelButton onClick={fireEdit} text="Resign" />
      ) : (
        <CancelButton onClick={fire} text="Resign" />
      )}
    </Box>
  );
}

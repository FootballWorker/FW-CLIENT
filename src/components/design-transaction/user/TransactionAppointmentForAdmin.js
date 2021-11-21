import React from "react";
import Box from "@mui/material/Box";

import WebSiteButton from "../../design-button/WebSiteButton";
import CancelButton from "../../design-button/CancelButton";
import {
  hirePresident,
  firePresident,
} from "./../../../team/api-team";

import {
  fireEditor,
} from "./../../../news/api-news";

export default function TransactionAppointmentForAdmin(props) {

  // President Functions
  const hirePresidentClick = () => {
    props.presidentButton(hirePresident);
  };
  const firePresidentClick = () => {
    props.presidentButton(firePresident);
  };

  const fireEditorClick = () => {
    props.editorButton(fireEditor);
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
        <>
          {props.user.team && (
            <CancelButton onClick={firePresidentClick} text="Fire President" />
          )}
          {!props.user.team && (
            <WebSiteButton onClick={hirePresidentClick} text="Hire President" />
          )}
        </>
      )}
      {props.user?.job?.title === "editor" && props.user.news && (
        <WebSiteButton onClick={fireEditorClick} text="Fire Editor" />
      )}
    </Box>
  );
}

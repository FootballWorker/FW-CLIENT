import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Loading(props) {
  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#51545B",
      }}
    >
      <Typography align="center" sx={{ color: "#FED829", fontSize: 30, fontWeight: "bold" }}>
        {props.text ? props.text :  "Loading... "}
      </Typography>
      <CircularProgress color="warning" sx={{ fontSize: 50 }} />
    </Stack>
  );
}

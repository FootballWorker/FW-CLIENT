import React from "react";
import { useHistory } from "react-router";
import PropTypes from 'prop-types'
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import "./button.css";

export default function NotFound(props) {
  const history = useHistory();
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
      <Typography
        align="center"
        sx={{ color: "#FED829", fontSize: 50, fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography
        align="center"
        gutterBottom
        sx={{ color: "#FED829", fontSize: {xs:15,md:22}, fontWeight: "bold",fontFamily: "'Quicksand', sans-serif",p:2 }}
      >
        {"The link you followed probably broken or " + props.text + " has been removed!"}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <button onClick={() => history.goBack()} className="button">
            Go Back
          </button>
        </Grid>
        <Grid item xs={6}>
          <button onClick={() => history.push("/home")} className="button">
            Go Home
          </button>
        </Grid>
      </Grid>
    </Stack>
  );
}


NotFound.propTypes = {
  text: PropTypes.string
}
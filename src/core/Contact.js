import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import YouTubeIcon from '@mui/icons-material/YouTube';
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import CancelButton from "../components/design-button/CancelButton";
import WebSiteButton from "../components/design-button/WebSiteButton";
import Logo from "./../assets/images/orijinalLogo.png";
import { contact } from "./../auth/api-auth";
import SnackError from "../errorHandler/SnackError.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Contact() {
  const [values, setValues] = useState({
    position: "",
    team: "",
    player: "",
    text: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  const clearOut = () => {
    setValues({ position: "", team: "", player: "", text: "" });
  };

  // Check it out
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    const content = {
      position: values.position || undefined,
      team: values.team || undefined,
      player: values.player || undefined,
      text: values.text,
    };

    contact(content).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setOpen(true);
        setValues({
          ...values,
          position: "",
          team: "",
          player: "",
          text: "",
          message: data.message,
        });
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        pt: {
          xs: 0,
          sm: 1,
          md: 2,
          lg: 4,
        },
        pb: 0.1,
        bgcolor: "#FED829",
      }}
    >
      <Grid container>
        <Grid xs={12} md={6}>
          <Paper
            elevation={8}
            sx={{
              margin: "auto",
              p: {
                xs: 0.1,
                sm: 1,
                md: 2,
                lg: 3,
              },
              width: 500,
              maxWidth: "100%",
            }}
          >
            <Typography
              align="center"
              gutterBottom
              sx={{
                p: 2,
                fontSize: {
                  xs: 15,
                  sm: 19,
                  md: 22,
                  lg: 25,
                },
                fontWeight: "bold",
              }}
            >
              Give Us Your Recommendations
            </Typography>
            <TextField
              id="position"
              label="Position Recommendation"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsRunIcon color="warning" />
                  </InputAdornment>
                ),
              }}
              value={values.position}
              onChange={handleChange("position")}
              color="warning"
              variant="standard"
              sx={{ mt: 2, pb: 1 }}
            />
            <TextField
              warning
              id="team"
              label="Team Recommendation"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon color="warning" />
                  </InputAdornment>
                ),
              }}
              value={values.team}
              onChange={handleChange("team")}
              color="warning"
              variant="standard"
              sx={{ mt: 2, pb: 1 }}
            />
            <TextField
              id="player"
              label="Player Recommendation"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="warning" />
                  </InputAdornment>
                ),
              }}
              value={values.player}
              onChange={handleChange("player")}
              color="warning"
              variant="standard"
              sx={{ mt: 2, pb: 1 }}
            />
            <TextField
              id="text"
              label="Other"
              fullWidth
              multiline
              rows={9}
              value={values.text}
              onChange={handleChange("text")}
              placeholder="You can share with us your recommendations other than these! Besides, you can let us know your complaints , accusations or praises :)"
              variant="standard"
              color="warning"
              sx={{ mt: 2, pb: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <CancelButton onClick={clearOut} text="Clear" />
              <WebSiteButton onClick={clickSubmit} text="Submit" />
            </Box>
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Box
            sx={{
              mt: 7,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          mt: {
            xs: 7,
            sm: 1,
            md: 5,
            lg: 12,
          },
          p: 2,
          gap: {
            xs: 5,
            sm: 0,
            md: 0,
            lg: 0,
          },
          maxWidth: "100%",
          bgcolor: "#51545B",
          color: "#FED829",
          borderTopLeftRadius: "1%",
          borderTopRightRadius: "1%",
        }}
      >
        <Grid
          xs={12}
          md={4}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <Typography align="center" variant="h6" gutterBottom>
            Communication
          </Typography>
          <Divider variant="middle" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 2,
              p: 3,
            }}
          >
            <a
              href="https://www.facebook.com/Football-Worker-112095084621046"
              style={{ color: "#FED829" }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/football_worker/"
              style={{ color: "#FED829" }}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://twitter.com/worker_football"
              style={{ color: "#FED829" }}
            >
              <TwitterIcon />
            </a>
            <a
              href="https://www.youtube.com/channel/UCQGyNzDVNOS27CCuv3nIrAg"
              style={{ color: "#FED829" }}
            >
              <YouTubeIcon />
            </a>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <Typography align="center" variant="body2">
              footballworker@hotmail.com
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography align="center" variant="h6" gutterBottom>
            Info & Rules
          </Typography>
          <Divider variant="middle" />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              - Users who curse or are accused of blasphemy to players and teams
              will not be a WORKER after the first warnings and his posts
              relating to cause him banned will be deleted!
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Users are allowed to use bad language with each other.
            </Typography>
            <Typography variant="body2" gutterBottom>
              - Users who share illegal media that use those are illegal will
              not be Worker after the first warnings and his posts relating to
              cause him banned will be deleted!
            </Typography>
            <Typography variant="body2" gutterBottom>
              - We are working on a program that users can use to show their
              tactical animations and images. Please wait for it patiently!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <Typography align="center" variant="body2">
              2021 / Created by 3E
            </Typography>
            <CopyrightIcon />
          </Box>
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {values.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

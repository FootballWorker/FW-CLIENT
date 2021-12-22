import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CircularProgress from "@mui/material/CircularProgress";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import auth from "../auth/auth-helper.js";
import { create } from "./api-poll";
import WebSiteButton from './../components/design-button/WebSiteButton'
import FormError from "../errorHandler/FormError.js";



const NewPoll = ({ match }) => {
  const [progress, setProgress] = useState(false);
  const [values, setValues] = useState({
    title: "",
    pollStart: new Date(),
    pollEnd: new Date(),
    error: "",
    open: false,
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = async () => {
    setProgress(true);
    const poll = {
      title: values.title || undefined,
      pollStart: values.pollStart || undefined,
      pollEnd: values.pollEnd || undefined,
    };

    create(
      { teamId: match.params.teamId },
      { t: jwt.token },
      poll
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values,  error: "500 Server Error. Poll could not be created." });
        setProgress(false);
      } else {
        setValues({
          ...values,
          open: true,
        });
        setProgress(false);
      }
    });
  };

  return (
    <div>
      <Paper
        elevation={12}
        sx={{
          margin: "auto",
          mt: 11,
          maxWidth: 600,
          height: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h6"
          sx={{
            p: 3,
            fontWeight: "bold",
            fontFamily: "Monospace",
            letterSpacing: 3,
          }}
        >
          NEW POLL
        </Typography>
        <Divider variant="middle" />
        <Card sx={{p:3}} >
          <TextField
            fullWidth
            required
            label="Title"
            id="title"
            variant="standard"
            sx={{
              mb: 2,
            }}
            value={values.title}
            onChange={handleChange("title")}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField sx={{ mb: 2 }} fullWidth required {...props} />
              )}
              label="Poll Starting Date"
              value={values.pollStart}
              onChange={(newValue) => {
                setValues({ ...values, pollStart: newValue });
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField sx={{ mb: 2 }} fullWidth required {...props} />
              )}
              label="Poll Ending Date"
              value={values.pollEnd}
              onChange={(newValue) => {
                setValues({ ...values, pollEnd: newValue });
              }}
            />
          </LocalizationProvider>
          <br />
          {values.error && <FormError text={values.error} />}
          <CardActions sx={{ justifyContent: "center", alignItems: "center" }}>
            <WebSiteButton text="Submit" onClick={clickSubmit} />
          </CardActions>
        </Card>
      </Paper>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Poll</DialogTitle>
        <DialogContent>
          <DialogContentText>New poll successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Go Home
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default NewPoll;

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardActions,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-match";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import Loading from "../components/loading/Loading";




const EditMatch = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    date: new Date(),
    homeScore: '',
    awayScore: '',
    redirectToMatch: false,
    error: ''
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setLoading(true);
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;

    // GETTING INFORMATION ABOUT PROFIL
    read(
      {
        matchId: match.params.matchId,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues(data);
        setLoading(false);
      }
    });

    // CLEANING DATA
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.matchId]);
  
  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({
      name: "",
      date: new Date(),
      homeScore: "",
      awayScore: "",
    });
  };

  const clickSubmit = () => {
    setOpen(true);
    // Form Submission with the file attached
    let matchData = {
      title: values.title || undefined,
      date: values.date || undefined,
      homeScore: values.homeScore || undefined,
      awayScore: values.awayScore || undefined,
    }

    // UPDATE PROFIL
    update({ matchId: match.params.matchId }, { t: jwt.token }, matchData).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
          setOpen(false);
        } else {
          setValues({ ...values, redirectToMatch: true });
          setOpen(false);
        }
      }
    );
  };

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToMatch) {
    return <Redirect to="/matches" />;
  }

  if (loading) {
    return <Loading />;
  }
  
  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        mt: 11,
        p: 0.5,
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
        EDIT MATCH
      </Typography>
      <Divider variant="middle" />
      <Card>
        <TextField
          fullWidth
          required
          label="Title"
          id="title"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.name}
          onChange={handleChange("title")}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDateTimePicker
            fullWidth
            required
            value={values.date}
            label="Choose Date"
            onChange={(newValue) => {
              setValues({ ...values, date: newValue });
            }}
            sx={{
              m: 2,
            }}
            renderInput={(params) => <TextField required {...params} />}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          required
          label="Home Score"
          id="homeScore"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.homeScore}
          onChange={handleChange("homeScore")}
        />
        <TextField
          fullWidth
          required
          label="Away Score"
          id="awayScore"
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.awayScore}
          onChange={handleChange("awayScore")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={clearForm} text="Clear" />
          <WebSiteButton onClick={clickSubmit} text="Submit" />
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditMatch;

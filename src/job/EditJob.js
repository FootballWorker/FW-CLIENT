import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import {read,update} from './api-jobs'
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import Loading from "../components/loading/Loading";
import SnackError from "../errorHandler/SnackError.js";



const EditJob = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    error: "",
    redirectToSignin: false,
    redirectToDepartment: false,
    id: "",
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    // GETTING INFORMATION ABOUT PROFIL
    read({ jobId: match.params.jobId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setValues({
            ...values,
            id: data._id,
            title: data.title,
          });
          setLoading(false);
        }
      }
    );

    // CLEANING DATA
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.jobId]);

  const clickSubmit = () => {
    setProgress(true);
    // Form Submission with the file attached
    let job = {
      title: values.title || undefined,
    };

    // UPDATE PROFIL
    update({ jobId: match.params.jobId }, { t: jwt.token }, job).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            redirectToDepartment: true,
          });
          setProgress(false);
        }
      }
    );
  };

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? 
          event.target.files[0] : 
          event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  }

  const clearForm = () => {
    setValues({ title: "" });
  };

  // For Authorization Error
  if (values.redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  // REDIRECT AFTER ENDING EDITING
  if (values.redirectToDepartment) {
    return <Redirect to={"/jobs/" + values.id} />;
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
        EDIT JOB JOB
      </Typography>
      <Divider variant="middle" />
      <Card>
        <TextField
          id="title"
          label="Title"
          fullWidth
          required
          variant="standard"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
        {values.error && <FormError text={values.error} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CancelButton onClick={clearForm} text="Clear Out" />
          <WebSiteButton onClick={clickSubmit} text="Submit" />
        </CardActions>
      </Card>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditJob;

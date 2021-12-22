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

import auth from "./../auth/auth-helper.js";
import {create} from './api-jobs.js'
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";





const NewJob = ({match}) => {
  const [values, setValues] = useState({
    title: "",
    error: "",
    open:false
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();


  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearForm = () => {
    setValues({ title: "" });
  };

  const clickSubmit = () => {
    setProgress(true);
    const job = {
      title: values.title || undefined,
    };
    create(
      {departmentId: match.params.departmentId},
      {t: jwt.token },
      job).then((data) => {
      if (data.error) {
        setValues({ ...values, error: "500 Server Error. Job could not be created." });
      } else {
        setValues({ ...values, error: "", open: true });
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
          NEW JOB
        </Typography>
        <Divider variant="middle" />
        <Card>
          <TextField
            fullWidth
            required
            label="Title"
            id="fullWidth"
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
      </Paper>
      <Dialog open={values.open}>
        <DialogTitle>Create Job</DialogTitle>
        <DialogContent>
          <DialogContentText>Job created successfully!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Go to Home!
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

export default NewJob;

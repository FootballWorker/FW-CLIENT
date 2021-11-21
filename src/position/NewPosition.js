import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Typography,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { create } from "./api-position";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from '../errorHandler/FormError'


const NewPosition = () => {
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
    const position = {
      title: values.title || undefined,
    };
    create(
      { t: jwt.token },
      position
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
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
          NEW POSITION
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
              Go to Home Page!
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

export default NewPosition;
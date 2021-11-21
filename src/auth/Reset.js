import {
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  Icon,
  TextField,
  DialogActions,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { reset } from "./api-auth.js";

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    password: "",
    password2: "",
    open: false,
    error: "",
  });
  const [success, setSuccess] = useState({
    open: false,
    message: "",
  });

  const clickSubmit = () => {
    if (values.password !== values.password2) {
      setValues({ ...values, error: "Passwords do not match!" });
    }
    let password = new FormData();
    values.password && password.append("password", values.password);
    reset({ resetToken: match.params.resetToken }, password).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setSuccess({
          ...success,
          open: true,
          message: data.message,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        mt: 11,
        p: 1.5,
        maxWidth: 600,
        height: "100%",
        bgcolor:'#51545b',
        textAlign: "center",
      }}
    >
      <Card sx={{p:2}} >
        <CardContent>
          <Typography variant="h6">Change Password</Typography>
          <br />
          <TextField
            id="password"
            label="Password"
            required
            fullWidth
            type="password"
            sx={{mb:2}}
            value={values.password}
            onChange={handleChange("password")}
          />
          <br />
          <TextField
            id="password2"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={values.password2}
            onChange={handleChange("password2")}
          />
          <br />
        </CardContent>
        <br />
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error">error</Icon>
            {values.error}
          </Typography>
        )}
        <CardActions sx={{justifyContent:'center'}} >
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={success.open}>
        <DialogTitle>Password Change</DialogTitle>
        <DialogContent>
          <DialogContentText>{success.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Go to login page!
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Reset;

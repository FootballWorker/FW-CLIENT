import React, { useEffect, useState } from "react";
import {  Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import { create , list } from "../user/api-user.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import WebSiteLink from "../components/design-button/WebSiteLink.js";
import FormError from "../errorHandler/FormError.js";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
    open: false,
    error: "",
  });
  const [users, setUsers] = useState([])


  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data)=> {
      if(data && data.error){
        console.log(data.error)
      }else{
        setUsers(data)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [])



  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearForm = () => {
    setValues({
      name: "",
      email: "",
      password: "",
    });
  };

  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role || undefined
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: "500 Server Error!" });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  if(users.length > 0){
    return <Redirect to="/signin" />
  }

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
          Sign Up
        </Typography>
        <Divider variant="middle" />
        <Card>
          <TextField
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.name}
            onChange={handleChange("name")}
          />
          <TextField
            id="email"
            type="email"
            label="Email"
            fullWidth
            required
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            fullWidth
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.password}
            onChange={handleChange("password")}
          />
          <TextField
            id="role"
            label="Role"
            fullWidth
            variant="standard"
            sx={{
              m: 2,
            }}
            value={values.role}
            onChange={handleChange("role")}
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
      <Dialog open={values.open} >
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <WebSiteLink link="/signin" text="Sign In Now!" />
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Signup;

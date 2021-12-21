import React, { useState } from 'react'
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

import {create} from './api-department.js'
import auth from './../auth/auth-helper.js'
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from '../errorHandler/FormError.js';



const NewDepartment = () => {
  const [values, setValues] = useState({
    name:"",
    aboutOne:"",
    aboutTwo:"",
    aboutThree:"",
    error:"",
    open:false
  })
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated() && auth.isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clearForm = () => {
    setValues({ name: "" });
  };

  const clickSubmit = () => {
    setOpen(true);
    const departmentData = {
      name : values.name , 
      aboutOne : values.aboutOne || undefined, 
      aboutTwo : values.aboutTwo || undefined,
      aboutThree : values.aboutThree || undefined  
    }

    create({ t: jwt.token }, departmentData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
        setOpen(false);
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
          NEW DEPARTMENT
        </Typography>
        <Divider variant="middle" />
        <Card sx={{p:2}} >
          <TextField
            id="name"
            label="Name"
            fullWidth
            required
            value={values.name}
            onChange={handleChange("name")}
            variant="standard"
            sx={{
              p: 1,
            }}
          />
          <TextField
            id="aboutOne"
            label="About One"
            fullWidth
            multiline
            rows={5}
            required
            variant="standard"
            value={values.aboutOne}
            onChange={handleChange("aboutOne")}
            sx={{
              p: 1,
            }}
          />
          <TextField
            id="aboutTwo"
            label="About Two"
            fullWidth
            multiline
            rows={5}
            variant="standard"
            value={values.aboutTwo}
            onChange={handleChange("aboutTwo")}
            sx={{
              p: 1,
            }}
          />
          <TextField
            id="aboutThree"
            label="About Three"
            fullWidth
            multiline
            rows={5}
            variant="standard"
            value={values.aboutThree}
            onChange={handleChange("aboutThree")}
            sx={{
              p: 1,
            }}
          />
          <br />
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
        <DialogTitle>Create Department</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Department created successfully!
          </DialogContentText>
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
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default NewDepartment

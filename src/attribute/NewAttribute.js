import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiAlert from "@mui/lab/Alert";

import auth from './../auth/auth-helper'
import {create} from './api-attribute'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function NewAttribute(props){
  const [values, setValues] = useState({
    category: '',
    point: '',
    open: false,
    redirect: false,
    error : ''
  })
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated()


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({...values,open:false});
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    setOpen(true);
    const attribute = {
      category: values.category || undefined,
      point: values.point || undefined,
    };
    let id = props.player && props.player._id

    create({playerId: id},{ t: jwt.token }, attribute).then((data) => {
      if (data.error) {
        setValues({...values , error: data.error , open:true})
        setOpen(false);
      } else {
        setValues({ ...values, error: "",  open:true , redirect: true });
        setOpen(false);
      }
    });
  };

  if(values.redirect){
    return <Redirect to="/home" />
  }

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Assessment</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <TextField
                required
                id="category"
                select
                label="Select"
                value={values.category}
                onChange={handleChange("category")}
                helperText="Please select category"
                variant="standard"
                sx={{ m: 1 }}
              >
                {props.categories && props.categories.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.title}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                id="point"
                label="Point"
                type="number"
                min="0"
                max="100"
                value={values.point}
                onChange={handleChange("point")}
                helperText="Your assessment must be between 0 and 100"
                variant="standard"
                sx={{
                  m: 1,
                }}
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={clickSubmit}
                contained
                sx={{
                  p: 1,
                  bgcolor: "DarkSlateGray  ",
                  color: "Gainsboro ",
                  ":hover": {
                    bgcolor: "Gainsboro",
                    color: "DarkSlateGray ",
                  },
                }}
              >
                Save!
              </Button>
            </CardActions>
          </Card>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={values.error ? "error" : "success"}
        >
          {values.error ? values.error : "Saved!"}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}


NewAttribute.propTypes = {
  player : PropTypes.object,
  categories: PropTypes.array
}
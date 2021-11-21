import React, { useState } from "react";
import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import auth from "./../auth/auth-helper";
import {  Link, Redirect } from "react-router-dom";
import { signin } from "./api-auth.js";
import FormError from "./../errorHandler/FormError";
import DoorBackIcon from '@mui/icons-material/DoorBack';
import { bgcolor } from "@mui/system";

export default function Signin(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    })
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };
  const { redirectToReferrer } = values;
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  if (auth.isAuthenticated()) {
    return <Redirect to="/home" />;
  }

  const enterKey = (event) => {
    if(event.keyCode == 13){
      event.preventDefault()
      clickSubmit()
    }
  }

  return (
    <Card
      sx={{
        margin: "auto",
        mt: 11,
        p: 0.5,
        maxWidth: 600,
        height: "100%",
      }}
    >
      <Box sx={{display:'flex',gap:2 , justifyContent:'center',alignItems:'center',textAlign:'center' }}  >
        <Typography variant="h6">Open Door</Typography>
        <DoorBackIcon />
      </Box>
      <CardContent>
        <TextField
          id="email"
          type="email"
          label="Email"
          fullWidth
          required
          variant="standard"
          sx={{
            m: 1,
          }}
          value={values.email}
          onChange={handleChange("email")}
        />
        <TextField
          id="password"
          type="password"
          required
          label="Password"
          fullWidth
          variant="standard"
          onKeyDown={enterKey}
          sx={{
            m: 1,
          }}
          value={values.password}
          onChange={handleChange("password")}
        />
        <br />
        {values.error && <FormError text={values.error} />}
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Button color="primary" variant="contained" onClick={clickSubmit}>
          GET IN
        </Button>
      </CardActions>
      <Box sx={{mt:1,ml:3,mb:1,display:'flex',flexDirection:'column', gap:1}} >
        <Link to="/forgot/password" style={{padding:'5px',maxWidth:150,borderRadius:'5px',textDecoration:'underline'}} >
          <Typography sx={{fontWeight:'bold'}} >
            Forgot Password
          </Typography>
        </Link>
        <Link to="/" style={{padding:'5px',maxWidth:150,borderRadius:'5px',textDecoration:'underline'}} >
          <Typography sx={{fontWeight:'bold'}} >
            Become FW
          </Typography>
        </Link>
      </Box>
    </Card>
  );
}

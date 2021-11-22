import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {  Button, Card, CardActions, Divider, Paper, TextField, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import { create } from "./api-comment";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError";



export default function NewComment({match}) {
  const [values, setValues] = useState({
    textOne: "",
    imageOne: "",
    error: "",
    redirectToHome: false,
  });
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();


  const clickSubmit = () => {
    if(values.textOne  === ""){
      return setValues({...values,error: "You must enter some text , right?"})
    }
    if(values.textOne?.length <  240){
      return setValues({...values,error: "Thats it? Your text must contain 240 characters at least."})
    }
    setOpen(true);
    let commentData = new FormData();
    values.textOne && commentData.append("textOne", values.textOne);
    values.imageOne && commentData.append("imageOne", values.imageOne);

    create(
      {
        postId: match.params.postId,
      },
      {
        t: jwt.token,
      },
      commentData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        setOpen(false);
      } else {
        setValues({ ...values, redirectToHome: true });
        setOpen(false);
      }
    });
  };

  const clearForm = () => {
    setValues({ textOne: "" });
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "imageOne"
        ? event.target.files[0]
        : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToHome) {
    return <Redirect to={"/posts/"+ match.params.postId} />;
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
        NEW COMMENT
      </Typography>
      <Divider variant="middle" />
      <Card>
        <input
          accept="image/*"
          onChange={handleChange("imageOne")}
          style={{ display: "none" }}
          id="imageOne"
          type="file"
        />
        <label htmlFor="imageOne">
          <Button component="span" variant="contained" sx={{ m: 2 }}>
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.imageOne ? values.imageOne.name : ""}</span>
        <TextField
          id="textOne"
          fullWidth
          required
          variant="standard"
          label="Text"
          min="300"
          multiline
          rows={10}
          sx={{
            m: 2,
          }}
          value={values.textOne}
          onChange={handleChange("textOne")}
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
}

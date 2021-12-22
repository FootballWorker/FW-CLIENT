import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";

import auth from "./../auth/auth-helper.js";
import { create } from "./api-news.js";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";

const NewNews = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    photo: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  //Store and Change Data
  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    if(!values.title || !values.description){
      return setValues({...values,error: "Fill the blanks!"})
    }
    let newsData = new FormData();
    values.title && newsData.append("title", values.title);
    values.description && newsData.append("description", values.description);
    values.photo && newsData.append("photo", values.photo);

    create({ t: jwt.token }, newsData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: "500 Server Error. News could not be created." });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  const clearForm = () => {
    setValues({
      title: "",
      description: "",
    });
  };

  if (values.redirect) {
    return <Redirect to={"/home"} />;
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
        NEW NEWSPAPER
      </Typography>
      <Divider variant="middle" />
      <Card>
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          style={{
            display: "none",
          }}
          id="photo"
          type="file"
        />
        <label htmlFor="photo">
          <Button component="span">
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <br />
        <TextField
          id="title"
          fullWidth
          required
          variant="standard"
          label="Title"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
        <br />
        <TextField
          fullWidth
          required
          variant="standard"
          label="Description"
          id="description"
          multiline
          rows={10}
          sx={{
            m: 2,
          }}
          value={values.description}
          onChange={handleChange("description")}
        />
        <br />
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
    </Paper>
  );
};

export default NewNews;

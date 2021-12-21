import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ImageIcon from "@mui/icons-material/Image";

import auth from "./../auth/auth-helper";
import { read, update } from "./api-news";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError";
import Loading from "../components/loading/Loading";
import config from "./../config/config";

const EditNews = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    photo: "",
    description: "",
    redirectToProfile: false,
    redirectToSignin: false,
    error: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  // Loading News Data first
  useEffect(() => {
    setLoading(true);
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;

    // GETTING INFORMATION ABOUT PROFIL
    read({ newsId: match.params.newsId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, redirectToSignin: true });
        } else {
          setValues(data);
          setLoading(false);
        }
      }
    );

    // CLEANING DATA
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({
      title: "",
      description: "",
    });
  };

  const clickSubmit = () => {
    setProgress(true);
    // Form Submission with the file attached
    let news = new FormData();
    values.title && news.append("title", values.title);
    values.photo && news.append("photo", values.photo);
    values.description && news.append("description", values.description);

    // UPDATE PROFIL
    update({ newsId: match.params.newsId }, { t: jwt.token }, news).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToProfile: true });
          setProgress(false);
        }
      }
    );
  };

  const photoUrl =
    match.params.newsId &&
    `${config.ServerURI}/api/news/photo/${
      match.params.newsId
    }?${new Date().getTime()}`;

  // REDIRECT AFTER UNSUCCESSFULLY ENDING EDITING
  if (values.redirectToSignin) {
    return <Redirect to={"/"} />;
  }

  // REDIRECT AFTER SUCCESSFULLY ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/news/" + match.params.newsId} />;
  }

  if (loading) {
    return <Loading text="News Data Loading..." />;
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
        EDIT NEWSPAPER
      </Typography>
      <Divider variant="middle" />
      <Card>
        <Box>
          <img
            src={photoUrl}
            alt="Profile"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </Box>
        <br />
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
          <Button component="span" variant="contained" sx={{ mb: 2 }}>
            Upload
            <ImageIcon />
          </Button>
        </label>
        <span>{values.photo ? values.photo.name : ""}</span>
        <Typography align="center">
          You have to select photo if it is even the same picture to complete
          editing.Changing Photo would take some time.
        </Typography>
        <br />
        <TextField
          fullWidth
          required
          variant="standard"
          label="Title"
          id="title"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
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
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditNews;

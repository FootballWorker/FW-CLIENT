import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Card,
  CardActions,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import {
  createForNews,
  createForPlayer,
  createForMatch,
  createForTeam,
} from "./api-post.js";
import CancelButton from "./../components/design-button/CancelButton.js";
import WebSiteButton from "./../components/design-button/WebSiteButton.js";
import FormError from "./../errorHandler/FormError";

export default function NewPost({ match }) {
  const [values, setValues] = useState({
    title: "",
    textOne: "",
    textTwo: "",
    imageOne: "",
    error: "",
    redirectToHome: false,
  });
  const [progress, setProgress] = useState(false);
  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    if(values.textOne  === ""){
      return setValues({...values,error: "You must enter some text , right?"})
    }
    if(values.textOne?.length <  240){
      return setValues({...values,error: "Thats it? Your text must contain 240 characters at least."})
    }
    setProgress(true);
    let token = auth.isAuthenticated() && auth.isAuthenticated().token;
    let postData = new FormData();
    values.title && postData.append("title", values.title);
    values.textOne && postData.append("textOne", values.textOne);
    values.textTwo && postData.append("textTwo", values.textTwo);
    values.imageOne && postData.append("imageOne", values.imageOne);

    if (match.params.playerId) {
      createForPlayer(
        {
          playerId: match.params.playerId,
        },
        {
          t: token,
        },
        postData
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToHome: true });
          setProgress(false);
        }
      });
    } else if (match.params.newsId) {
      createForNews(
        {
          newsId: match.params.newsId,
        },
        {
          t: token,
        },
        postData
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToHome: true });
          setProgress(false);
        }
      });
    } else if (match.params.teamId) {
      createForTeam(
        {
          teamId: match.params.teamId,
        },
        {
          t: token,
        },
        postData
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToHome: true });
          setProgress(false);
        }
      });
    } else {
      createForMatch(
        {
          matchId: match.params.matchId,
        },
        {
          t: jwt.token,
        },
        postData
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
          setProgress(false);
        } else {
          setValues({ ...values, redirectToHome: true });
          setProgress(false);
        }
      });
    }
  };
  const clearForm = () => {
    setValues({ title: "", textOne: "", textTwo: "" });
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "imageOne" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  if (values.redirectToHome) {
    return (
      <Redirect
        to={
          match.params.teamId
            ? "/teams/" + match.params.teamId
            : match.params.newsId
            ? "/news/" + match.params.newsId
            : match.params.playerId
            ? "/players/" + match.params.playerId
            : "/matches/" + match.params.matchId
        }
      />
    );
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
        {match.params.newsId
          ? "NEW NEWS POST"
          : match.params.matchId
          ? "NEW MATCH POST"
          : match.params.teamId
          ? "NEW TEAM POST"
          : "NEW PLAYER POST"}
      </Typography>
      <Divider variant="middle" />
      <Card>
        <input
          accept="image/*"
          id="imageOne"
          onChange={handleChange("imageOne")}
          style={{
            display: "none",
          }}
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
          id="title"
          fullWidth
          variant="standard"
          label="Title"
          sx={{
            m: 2,
          }}
          value={values.title}
          onChange={handleChange("title")}
        />
        <TextField
          id="textOne"
          fullWidth
          required
          variant="standard"
          label="Text"
          multiline
          rows={10}
          sx={{
            m: 2,
          }}
          value={values.textOne}
          onChange={handleChange("textOne")}
        />
        <TextField
          id="textTwo"
          fullWidth
          variant="standard"
          label="Text"
          multiline
          rows={10}
          sx={{
            m: 2,
          }}
          value={values.textTwo}
          onChange={handleChange("textTwo")}
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
}

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import { read, update } from "./api-department";
import CancelButton from "../components/design-button/CancelButton.js";
import WebSiteButton from "../components/design-button/WebSiteButton.js";
import FormError from "../errorHandler/FormError.js";
import Loading from "../components/loading/Loading";

const EditDepartment = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    aboutOne: "",
    aboutTwo: "",
    aboutThree: "",
    error: "",
    redirectToProfile: false,
    id: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    // SETTING SIGNAL
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    // GETTING INFORMATION ABOUT PROFIL
    read({ departmentId: match.params.departmentId }, signal).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: "500 Server Error. Department could not be uploaded.",
        });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
        });
        setLoading(false);
      }
    });

    // CLEANING DATA
    return () => {
      abortController.abort();
    };
  }, [match.params.departmentId]);

  const clickSubmit = () => {
    setOpen(true);
    let department = {
      name: values.name || undefined,
      aboutOne: values.aboutOne || undefined,
      aboutTwo: values.aboutTwo || undefined,
      aboutThree: values.aboutThree || undefined,
    };

    // UPDATE PROFIL
    update(
      { departmentId: match.params.departmentId },
      { t: jwt.token },
      department
    ).then((data) => {
      if (data && data.error) {
        setValues({
          ...values,
          error: "500 Server Error. Department could not be edited.",
        });
      } else {
        setValues({ ...values, redirectToProfile: true });
        setOpen(false);
      }
    });
  };

  // Targeting value
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    // userData.set(name,value)
    setValues({ ...values, [name]: value });
  };

  const clearForm = () => {
    setValues({ name: "", aboutOne: "", aboutTwo: "", aboutThree: "" });
  };

  if (loading) {
    return <Loading text="Department is loading..." />;
  }

  // REDIRECT AFTER SUCCESSFULLY ENDING EDITING
  if (values.redirectToProfile) {
    return <Redirect to={"/departments/" + values.id} />;
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
        EDIT DEPARTMENT
      </Typography>
      <Divider variant="middle" />
      <Card sx={{ p: 2 }}>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          fullWidth
          required
          sx={{
            p: 1,
          }}
          value={values.name}
          onChange={handleChange("name")}
        />
        <TextField
          id="aboutOne"
          label="About One"
          variant="standard"
          multiline
          rows={5}
          fullWidth
          required
          sx={{
            p: 1,
          }}
          value={values.aboutOne}
          onChange={handleChange("aboutOne")}
        />
        <TextField
          id="aboutTwo"
          label="About Two"
          variant="standard"
          fullWidth
          multiline
          rows={5}
          sx={{
            p: 1,
          }}
          value={values.aboutTwo}
          onChange={handleChange("aboutTwo")}
        />
        <TextField
          id="aboutThree"
          label="About Three"
          variant="standard"
          fullWidth
          multiline
          rows={5}
          sx={{
            p: 1,
          }}
          value={values.aboutThree}
          onChange={handleChange("aboutThree")}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default EditDepartment;

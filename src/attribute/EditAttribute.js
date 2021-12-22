import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CircularProgress from "@mui/material/CircularProgress"
import Divider from "@mui/material/Divider"
import Paper from "@mui/material/Paper"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import WebSiteButton from "../components/design-button/WebSiteButton";
import FormError from "../errorHandler/FormError";
import auth from "../auth/auth-helper";
import { read,updateAttribute } from "./api-attribute";


const EditAttribute = ({match}) => {
  const [values, setValues] = useState({
    point: "",
    category: "",
    redirect: false,
  });
  const [player, setPlayer] = useState("")
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
    editError: "",
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    read( {attributeId:match.params.attributeId},{t:jwt.token}).then((data)=>{
      if(data?.error){
        setIsError({ ...isError, open: true, error: "500 Server Error! Attribute could not be loaded." });
      }else{
        setValues(data)
        setPlayer(data?.player?._id)
      }
    })
    
  }, [match.params.attributeId])

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const editAtt = () => {
    setProgress(true);
    if (
      !values.point ||
      0 > parseInt(values.point) ||
      parseInt(values.point) > 100
    ) {
      return setIsError({
        ...isError,
        openSnack: true,
        error: "",
        editError: "Your points are not in the valid range!",
      });
    }
    const attribute = {
      attributeId: match.params.attributeId,
      point: values.point || undefined,
      recordedBy: jwt.user?._id,
    };
    updateAttribute({ t: jwt.token }, attribute).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "",
          editError: "500 Server Error! Attribute could not be edited."
        });
        setProgress(false);
      } else {
        setProgress(false);
        setValues({...values,redirect:true})
      }
    });
  };

  if(values.redirect){
    return <Redirect to={"/players/"+player} />
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
        {values?.category}
      </Typography>
      <Divider variant="middle" />
      <Card>
        <TextField
          required
          id="point"
          label="Point"
          type="number"
          size="small"
          min="0"
          max="100"
          value={values.point}
          onChange={handleChange("point")}
          variant="standard"
          sx={{
            maxWidth: 100,
          }}
        />
        {isError.error && <FormError text={isError.error} />}
        {isError.editError && <FormError text={isError.editError} />}
        <CardActions
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WebSiteButton onClick={editAtt} text="Submit" />
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

export default EditAttribute;

import React, { useEffect, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { activation } from "./api-user";
import Logo from "./../assets/images/orijinalLogo.png";
import WebSiteLink from "../components/design-button/WebSiteLink";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    error: "",
    open:false
  });

  useEffect(() => {
    activation({ activationToken: match.params.activationToken }).then(
      (data) => {
        if (data?.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "", open:true });
        }
      }
    );
  }, [match.params.activationToken]);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({...values,open:false});
  };

  return (
    <Paper elevation={4} sx={{ margin: "auto", height: '100vh', bgcolor: "#51545B" }}>
      <Stack
        spacing={5}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            mt: 2,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              maxWidth: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          />
        </Box>
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 15, color: "#FED829" }}
        >
          {values.error ? values.error : "What are you waiting for ? C'mon!" }
        </Typography>
        {
          values.error ? (
            <WebSiteLink link="/" text="Sign Up" />
          ) : (
            <WebSiteLink link="/signin" text="Sign In" />
          )
        }
      </Stack>
      <Snackbar open={values.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Congratulations! You are an FW officially right now.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Activate;

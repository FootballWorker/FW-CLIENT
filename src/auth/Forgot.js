import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography,
  Icon,
  TextField,
  DialogActions,
  Paper,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import { forgot } from "./api-auth.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Forgot = () => {
  const [values, setValues] = useState({
    email: "",
    open: false,
    error: "",
  });
  const [open, setOpen] = useState(false);



  const handleChange = (name) => (event) => {
    const value =
      name === "imageOne" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    if (!values.email) {
      return setValues({ ...values, error: "Email is required" });
    }
    const email = {
      email: values.email || undefined,
    };
    forgot(email).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
        setOpen(true)
      }
    });
  }
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        mt: 11,
        p: 1.5,
        maxWidth: 600,
        height: "100%",
        textAlign: "center",
        bgcolor:'#51545B'
      }}
    >
      <Card sx={{p:2}} >
        <CardContent>
          <Typography variant="h6">Forgot Password</Typography>
          <br />
          <TextField
            id="email"
            required
            label="Email"
            type="email"
            fullWidth
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">error</Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{justifyContent:'center'}} >
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
      <Dialog open={values.open}>
        <DialogTitle>Password Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Check your Email.We send you a password reset link.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Go to login page
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          If you did not got any email from us , try again.
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Forgot;

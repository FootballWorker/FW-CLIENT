import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';

import auth from './../../../auth/auth-helper'
import {list} from './../../../team/api-team'
import {changeFavorite} from './../../../user/api-user'
import SnackError from '../../../errorHandler/SnackError.js';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangeTeam(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [teams, setTeams] = useState([])
  const [values, setValues] = useState({
    favoriteTeam: ""
  })
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data)=>{
      if(data?.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Teams could not be loaded."
        });
      }else{
        setTeams(data)
      }
    })

    return () => {
      abortController.abort()
    }
  }, [])

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clickSubmit = () => {
    let favoriteTeam = values.favoriteTeam || undefined
    if(favoriteTeam){
      changeFavorite(
        {userId : jwt.user._id},
        {t:jwt.token},
        favoriteTeam
      ).then((data)=> {
        if(data?.error){
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error! Your team could not be changed."
          });
        }else{
          setRedirect(true)
        }
      })
    }else{
      setIsError({
        ...isError,
        openSnack: true,
        error: "500 Server Error! Team could not be founded."
      });
    }
  }

  if(redirect){
    return <Redirect to="/home" />
  }

  return (
    <div>
      <Tooltip title="Select your member team" >
        <IconButton onClick={handleClickOpen} >
          <ChangeCircleIcon />
        </IconButton>
      </Tooltip>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition} >
        <DialogTitle sx={{textAlign:'center'}} >Change Team</DialogTitle>
        <DialogContent sx={{margin:'auto'}} >
          <TextField
            id="favoriteTeam"
            fullWidth
            select
            value={values.favoriteTeam}
            onChange={handleChange("favoriteTeam")}
            SelectProps={{
              native: true,
            }}
            helperText="Choose Team"
          >
            {teams?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{justifyContent:'center'}} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={clickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

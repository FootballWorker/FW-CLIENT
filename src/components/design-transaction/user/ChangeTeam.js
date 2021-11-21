import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { IconButton } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Button from "@mui/material/Button";
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
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data)=>{
      if(data?.error){
        console.log(data.error)
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
          console.log(data.error)
        }else{
          setRedirect(true)
        }
      })
    }else{
      console.log("No team")
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

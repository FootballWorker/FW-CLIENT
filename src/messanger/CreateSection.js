import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GroupsIcon from '@mui/icons-material/Groups';

import auth from "./../auth/auth-helper";
import { createTeamChat } from "./api-messanger.js";
import { useHistory } from "react-router";


export default function CreateSection(props) {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const jwt = auth.isAuthenticated();
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if(!chatName){
      return false;
    }

    createTeamChat({chatName:chatName},{t:jwt.token}).then((data)=> {
      if(data?.error){
        props.setIsError({
          ...props.isError,
          openSnack: true,
          error: "500 Server Error. The meeting could not be created."
        });
      }else{
        history.push("/chats/"+data?._id)
      }
    })
  }

  return (
    <Paper sx={{ margin: "auto",mb:2, p: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen} sx={{p:1,gap:2}}  >
        <GroupsIcon />
        Create Meeting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{margin:'auto'}} >New Meeting!</DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom >
            You are about to set up a team meeting. Make sure to use proper keywords to
            explain the subject of the meeting partially.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="chatName"
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            label="Meeting Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

import React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from "@mui/material/Dialog";
import { ListItemButton } from "@mui/material";

import auth from "./../auth/auth-helper";
import { createChats } from "./api-messanger";

export default function SearchUsers({ following, setCurrentChat }) {
  const jwt = auth.isAuthenticated();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleSubmit = (id, name) => {
    createChats({ userId: id }, { t: jwt.token }, name).then((data) => {
      if (data?.error) {
        console.log(data.error);
      } else {
        setCurrentChat(data);
        console.log(data);
      }
    });
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Create Chat
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
      <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ margin:'auto' }}>
          {following?.map((item) => (
            <ListItemButton
              key={item._id}
              onClick={() => handleSubmit(item._id, item.name)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Dialog>
    </div>
  );
}

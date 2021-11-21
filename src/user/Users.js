import React, { useState , useEffect } from "react";
import { Link , Redirect } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import auth from './../auth/auth-helper.js'
import {list} from './api-user'
import { ListItemSecondaryAction } from "@mui/material";
import DeleteFromList from "./DeleteFromList";
import kFormatter from "../components/numbers.js";

export default function Users() {
  const [users, setUsers] = useState([])
  const [redirect, setRedirect] = useState(false)
  const jwt = auth.isAuthenticated()
  
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    list(signal).then((data)=>{
      if(data && data.error){
        setRedirect(true)
      }else{
        setUsers(data)
      }
    })
    
    return () => {
      abortController.abort()
    }
  }, [])

  const removeUser = (user) => {
    const updatedUsers = [...users]
    const index = updatedUsers.indexOf(user)
    updatedUsers.splice(index,1)
    setUsers(updatedUsers)
  }


  if(redirect){
    return <Redirect to="/" />
  }

  return (
    <Paper elevation={12}>
      
        <Typography
          align="center"
          variant="h6"
          gutterBottom
          component="div"
          sx={{
            pt: 1,
            fontFamily: "Raleway",
            fontWeight: 700,
          }}
        >
          Users
        </Typography>
      <Divider variant="middle" />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users.length > 0 ? (
          users.map((item, i) => (
            <ListItemButton key={i}>
              <ListItemAvatar>
                <Avatar
                  src={
                    item.photo
                      ? "/api/users/photo/" + item._id
                      : "/api/users/defaultphoto"
                  }
                  sx={{ width: 25, height: 25 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: {
                        xs: "0.85em",
                        sm: "1em",
                      },
                    }}
                  >
                    {item.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: {
                        xs: "0.65em",
                        sm: "1em",
                      },
                    }}
                  >
                    {"Followers : " + kFormatter(item.followerLength)}
                  </Typography>
                }
              />
              <ListItemSecondaryAction sx={{display: 'flex', alignItems :'center',textAlign:'center'}} >
                {
                  jwt.user && jwt.user.role === 'admin' && (
                    <DeleteFromList onRemove={removeUser} userId={item._id} />
                  )
                }
                <Link to={"/users/" + item._id}>
                  <IconButton>
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </Link>
              </ListItemSecondaryAction>
            </ListItemButton>
          ))
        ) : (
          <Typography align="center"> No User Found! </Typography>
        )}
      </List>
    </Paper>
  );
}


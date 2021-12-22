import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import auth from './../../auth/auth-helper'
import {hireEditor,hireEmployee} from './../../news/api-news'
import {hireVice,hireManager,hireCoach,hireYouth,hireScout} from './../../team/api-team'
import WebSiteButton from "../design-button/WebSiteButton";
import {config} from './../..//config/config.js'
import ListHeader from "../header/ListHeader";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Users(props) {
  const [error, setError] = useState({
    open: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Handle SnackBar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ ...error, open: false });
  };

  return (
    <Paper elevation={12}>
      {props.header && (
        <ListHeader header={props.header} />
      )}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {props.users && props.users.length > 0 ? (
          props.users.map((item, i) => (
            <ListItemButton key={i}>
              <ListItemAvatar>
                <Avatar
                  src={
                    item.photo
                      && config.ServerURI + "/api/users/photo/" + item._id
                  }
                  sx={{ width: 25, height: 25 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link to={"/users/" + item._id}>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: {
                          xs: "0.95em",
                          sm: "1.3em",
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                }
              />
              <ListItemSecondaryAction>
                {props.news &&
                  !item.news &&
                  item.job &&
                  item.job.title === "editor" &&
                  jwt.user.role === "admin" && (
                    <WebSiteButton
                      onClick={() => hireEditor(
                        { userId: item._id },
                        { t: jwt.token },
                        props.news._id
                      ).then((data) => {
                        if (data.error) {
                          setError({ ...error, error: data.error, open: true });
                        } else {
                          window.location.reload(false);
                        }
                      })}
                      text="Hire Editor"
                    />
                  )}
                {props.news &&
                  !item.news &&
                  jwt.user &&
                  jwt.user.job &&
                  jwt.user.job.title === "editor" &&
                  jwt.user.news &&
                  jwt.user.news._id === props.news._id && (
                    <WebSiteButton
                      onClick={() => hireEmployee(
                        { userId: item._id },
                        { t: jwt.token },
                        props.news._id
                      ).then((data) => {
                        if (data.error) {
                          setError({ ...error, error: data.error, open: true });
                        } else {
                          window.location.reload(false);
                        }
                      })}
                      text="Hire Employee"
                    />
                  )}
                {props.team &&
                  !item.team &&
                  item.job &&
                  props.team.vicePresident.length < 5 &&
                  item.job.title === "vice president" &&
                  jwt.user.job &&
                  jwt.user.job.title === "president" &&
                  jwt.user.team &&
                  jwt.user.team._id === props.team._id && (
                    <WebSiteButton
                      onClick={() =>
                        hireVice(
                          { userId: item._id },
                          { t: jwt.token },
                          props.team._id
                        ).then((data) => {
                          if (data.error) {
                            setError({
                              ...error,
                              error: data.error,
                              open: true,
                            });
                          } else {
                            window.location.reload(false);
                          }
                        })
                      }
                      text="Hire VP"
                    />
                  )}
                {props.team &&
                  !props.team.manager &&
                  jwt.user &&
                  jwt.user.job &&
                  item.job &&
                  item.job.title === "manager" &&
                  !item.team &&
                  jwt.user.job.title === "president" &&
                  jwt.user.team &&
                  jwt.user.team._id === props.team._id && (
                    <WebSiteButton
                      onClick={() =>
                        hireManager(
                          { userId: item._id },
                          { t: jwt.token },
                          props.team._id
                        ).then((data) => {
                          if (data.error) {
                            setError({
                              ...error,
                              error: data.error,
                              open: true,
                            });
                          } else {
                            window.location.reload(false);
                          }
                        })
                      }
                      text="Hire Manager"
                    />
                  )}
                {props.team &&
                  !item.team &&
                  item.job &&
                  props.team.coach.length < 5 &&
                  item.job.title === "coach" &&
                  jwt.user.job &&
                  jwt.user.job.title === "manager" &&
                  jwt.user.team &&
                  jwt.user.team._id === props.team._id && (
                    <WebSiteButton
                      onClick={() =>
                        hireCoach(
                          { userId: item._id },
                          { t: jwt.token },
                          props.team._id
                        ).then((data) => {
                          if (data.error) {
                            setError({
                              ...error,
                              error: data.error,
                              open: true,
                            });
                          } else {
                            window.location.reload(false);
                          }
                        })
                      }
                      text="Hire Coach"
                    />
                  )}
                {props.team &&
                  !item.team &&
                  item.job &&
                  props.team.youth.length < 5 &&
                  item.job.title === "youth" &&
                  jwt.user.job &&
                  jwt.user.job.title === "manager" &&
                  jwt.user.team &&
                  jwt.user.team._id === props.team._id && (
                    <WebSiteButton
                      onClick={() => hireYouth(
                        { userId: item._id },
                        { t: jwt.token },
                        props.team._id
                      ).then((data) => {
                        if (data.error) {
                          setError({ ...error, error: data.error, open: true });
                        } else {
                          window.location.reload(false);
                        }
                      })}
                      text="Hire Youth"
                    />
                  )}
                {props.team &&
                  !item.team &&
                  item.job &&
                  props.team.scout.length < 5 &&
                  item.job.title === "scout" &&
                  jwt.user.job &&
                  jwt.user.job.title === "manager" &&
                  jwt.user.team &&
                  jwt.user.team._id === props.team._id && (
                    <WebSiteButton
                      onClick={() =>
                        hireScout(
                          { userId: item._id },
                          { t: jwt.token },
                          props.team._id
                        ).then((data) => {
                          if (data.error) {
                            setError({
                              ...error,
                              error: data.error,
                              open: true,
                            });
                          } else {
                            window.location.reload(false);
                          }
                        })
                      }
                      text="Hire Scout"
                    />
                  )}
              </ListItemSecondaryAction>
            </ListItemButton>
          ))
        ) : (
          <Typography align="center"> No User Found! </Typography>
        )}
      </List>
      <Snackbar open={error.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error.error}
        </Alert>
      </Snackbar>
    </Paper>
  );
}


Users.propTypes = {
  users : PropTypes.array,
  header : PropTypes.string,
  news: PropTypes.object,
  team: PropTypes.object,
}
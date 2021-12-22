import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import auth from "../auth/auth-helper";
import { createChats, listChats } from "./api-messanger";
import { read } from "../user/api-user";
import Conversation from "./Conversation";
import CreateSection from "./CreateSection";
import {config} from "../config/config";
import SnackError from "../errorHandler/SnackError";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import ListHeader from "../components/header/ListHeader";
import PageHeader from "../components/header/PageHeader";

const Messanger = ({ match }) => {
  const [user, setUser] = useState({});
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const history = useHistory();
  let isTop = window.scrollY == 0;
  const isPresident =
    jwt.user._id === match.params.userId &&
    jwt.user?.job?.title === "president" &&
    jwt.user?.team;

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data?.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. User could not be uploaded."
          });
        } else {
          setUser(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  useEffect(() => {
    setLoading(true);
    listChats({ userId: match.params.userId }, { t: jwt.token }).then(
      (data) => {
        if (data?.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Conversations could not be uploaded."
          });
        } else {
          setConversations(data);
          setLoading(false);
        }
      }
    );
  }, [match.params.userId]);

  const handleSubmit = (id, name) => {
    createChats({ userId: id }, { t: jwt.token }, name).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Chat could not be created."
        });
      } else {
        if (data?._id) {
          history.push("/chats/" + data?._id);
        }
      }
    });
  };

  if (match.params.userId !== jwt.user?._id) {
    return <Redirect to="/home" />;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { md: 3, lg: 10 },
        margin: "auto",
        textAlign: "center",
      }}
    >
      <PageHeader header="Messanger" />
      <Grid
        container
        sx={{ p: { xs: 0, md: 1, lg: 4 }, margin: "auto", textAlign: "center" }}
      >
        <Grid item md={6} lg={5} sx={{ width: "100%", textAlign: "center" }}>
          {loading ? (
            <ListSkelaton />
          ) : (
            <Paper
              elevation={1}
              sx={{
                m: 1,
                p: 1,
                textAlign: "center",
                maxHeight: "100%",
                overflow: "auto",
              }}
            >
              {isPresident && (
                <CreateSection
                  following={user?.following}
                  setConversations={setConversations}
                  setIsError={setIsError}
                  isError={isError}
                />
              )}
              <Box sx={{ p: 1 }}>
                <ListHeader header="Conversations" />
                <List>
                  {conversations?.map((c) => (
                    <ListItemButton
                      onClick={() => {
                        history.push("/chats/" + c._id);
                      }}
                      key={c._id}
                    >
                      <ListItemIcon>
                        {c?.readBy?.includes(jwt.user?._id) && <DoneAllIcon />}
                      </ListItemIcon>
                      <Conversation
                        conversation={c}
                        currentUser={user}
                        messages={c.messages}
                        setIsError={setIsError}
                        isError={isError}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            </Paper>
          )}

          {!isTop && (
            <IconButton
              sx={{ bgcolor: "#28DE37", position: "fixed", bottom: 4, left: 4 }}
              onClick={animateScroll.scrollToTop}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item md={6} lg={7} sx={{ width: "100%", textAlign: "center" }}>
          {loading ? (
            <ListSkelaton />
          ) : (
            <Paper elevation={4} sx={{ m: 1, p: 1 }}>
              <ListHeader header="Following Users" />
              <List sx={{ margin: "auto" }}>
                {user?.following?.map((item) => (
                  <ListItemButton
                    onClick={() => handleSubmit(item._id, item.name)}
                    key={item._id}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={
                          item._id &&
                          config.ServerURI + "/api/users/photo/" + item._id
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default Messanger;

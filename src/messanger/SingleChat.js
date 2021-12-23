import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Box } from "@mui/system";

import { config } from "../config/config";
import auth from "../auth/auth-helper";
import {
  readChat,
  removeFromGroup,
  listTeamWorkers,
  addToGroup,
  renameGroup,
} from "./api-messanger";
import Message from "./Message";
import SnackError from "../errorHandler/SnackError";
import MessageSkeleton from "../components/skelatons/MessageSkeleton";

const SingleChat = ({ match }) => {
  const history = useHistory();
  const [chat, setChat] = useState({});
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatName, setChatName] = useState("");
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();
  const socket = useRef();
  const scrollRef = useRef();
  let isTop = window.scrollY == 0;
  const isUser = chat?.users?.some((user) => user._id === jwt.user?._id);

    // Load Chat
    useEffect(() => {
      setLoading(true);
      readChat({ chatId: match.params.chatId }, { t: jwt.token }).then((data) => {
        if (data?.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "Chat not found!",
          });
        } else {
          setChat(data);
          setMessages(data?.messages);
          setLoading(false);
          console.log(data?.messages)
          console.log(messages)
        }
      });
    }, [match.params.chatId]);
  

  // Socket API
  useEffect(() => {
    socket.current = io("wss://footballworker.herokuapp.com",{
      transports: [ "websocket" ]
    });
    socket.current?.emit("join chat room", { room: match.params.chatId });
    console.log(socket.current);
    console.log(socket.current?.emit);
    console.log(messages);
    return () => {
      socket.current?.emit("leave chat room", {
        room: match.params.chatId,
      });
    };
  }, []);

  useEffect(() => {
    socket.current?.on("new message", (payload) => {
      setMessages((messages) => [...messages, payload]);
      console.log(messages);
      console.log(payload);
      console.log(socket);
    });
    return () => {
      socket?.current?.off("new message");
    };
  }, []);


  // Load Workers
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listTeamWorkers({ teamId: jwt.user?.team?._id }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "Your collegues not found!",
        });
      } else {
        setUsers(data);
        setLoading(false);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [jwt.user?.team?._id]);

  const receiver = chat?.users?.find((member) => member?._id !== jwt.user._id);

  const handleSubmit = () => {
    if (!isUser) {
      return false;
    }
    console.log(isUser)
    const messageInfo = {
      sender: jwt.user._id,
      text: newMessage,
    };

    socket.current.emit("new message", {
      messageInfo: messageInfo,
      room: match.params.chatId,
    });
    console.log(socket?.current);
    console.log(socket?.current?.emit("new message"));
    setNewMessage("");
  };

  const enterKey = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Remove from Meeting
  const clickButton = () => {
    setOpen(true);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  const handleDelete = (userId) => {
    removeFromGroup(
      { chatId: match.params.chatId },
      { t: jwt.token },
      userId
    ).then((data) => {
      if (data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "User not deleted!",
        });
      } else {
        setChat(data);
        setOpen(false);
      }
    });
  };

  // Add to Meeting API
  const clickSecondButton = () => {
    setSecondOpen(true);
  };

  const handleRequestSecondClose = () => {
    setSecondOpen(false);
  };

  const handleAdd = (userId) => {
    addToGroup({ chatId: match.params.chatId }, { t: jwt.token }, userId).then(
      (data) => {
        if (data?.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "User could not participate!",
          });
        } else {
          setChat(data);
          setSecondOpen(false);
        }
      }
    );
  };

  // Rename
  const handleOpenClick = () => {
    setThirdOpen(true);
  };

  const handleRenameClose = () => {
    setThirdOpen(false);
  };

  const renameChat = () => {
    if (!chatName) {
      return console.log("Where is the name dude?");
    }

    renameGroup(
      { chatId: match.params.chatId },
      { t: jwt.token },
      chatName
    ).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setChat(data);
        setThirdOpen(false);
      }
    });
  };

  return (
    <Paper>
      <Box sx={{ margin: "auto", p: { xs: 1, sm: 1, md: 2, lg: 10 }, mt: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            mb: 3,
          }}
        >
          <Button
            sx={{ p: 1, fontSize: { xs: 12, sm: 15, md: 17, lg: 20 } }}
            variant="contained"
            color="primary"
            onClick={() => history.push("/messanger/" + jwt.user?._id)}
          >
            <ArrowBackIosIcon />
            Go Back
          </Button>
          {chat?.groupAdmin?._id === jwt.user?._id ? (
            <Typography
              align="center"
              varian="h5"
              sx={{
                fontSize: { xs: 14, sm: 17, md: 21, lg: 25 },
                fontWeight: 500,
              }}
            >
              {chat?.chatName}
              <small>
                <IconButton onClick={handleOpenClick} sx={{ ml: 1 }}>
                  {" "}
                  <ModeEditOutlineRoundedIcon />{" "}
                </IconButton>
              </small>
            </Typography>
          ) : (
            <Typography
              align="center"
              varian="h5"
              sx={{
                fontSize: { xs: 14, sm: 17, md: 21, lg: 25 },
                fontWeight: 500,
              }}
            >
              {receiver?.name}
            </Typography>
          )}
          {chat?.groupAdmin?._id === jwt.user?._id && (
            <>
              <Button
                sx={{ p: 1, fontSize: { xs: 12, sm: 15, md: 17, lg: 20 } }}
                variant="contained"
                color="secondary"
                onClick={clickSecondButton}
              >
                <PersonSearchIcon />
                Add User
              </Button>
              <Dialog
                open={secondOpen}
                onClose={handleRequestSecondClose}
                fullWidth
              >
                <DialogTitle align="center">
                  Add User to the Meeting
                </DialogTitle>
                <List sx={{ margin: "auto" }}>
                  {users?.map((item) => (
                    <ListItemButton
                      onClick={() => handleAdd(item._id)}
                      key={item._id}
                      sx={{ ":hover": { bgcolor: "#E4E8E4" } }}
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
              </Dialog>
            </>
          )}
        </Box>
        {/* Users */}
        {chat?.isGroupChat && (
          <List
            sx={{
              margin: "auto",
              maxWidth: 600,
              p: 2,
              mb: 3,
              bgcolor: "#E4E8E4",
              borderRadius: "10px",
              borderColor: "#51545b",
              boxShadow: { md: "-5px 4px 11px 8px rgba(0,0,0,0.48)" },
            }}
          >
            <Typography align="center" variant="h5" sx={{ fontWeight: 500 }}>
              Users
            </Typography>
            {chat.users?.map((item) => (
              <ListItem key={item._id}>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to={"/users/" + item._id}>
                    <ArrowForwardIcon fontSize="small" />
                  </Link>
                  {jwt.user?.job?.title === "president" &&
                    jwt.user.team &&
                    chat?.groupAdmin?._id === jwt.user?._id && (
                      <Box sx={{ display: "flex" }}>
                        <IconButton onClick={clickButton}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Dialog open={open} onClose={handleRequestClose}>
                          <DialogTitle>Remove User</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Confirm to remove this user.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleRequestClose}
                              color="primary"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleDelete(item._id)}
                              color="secondary"
                              autoFocus="autoFocus"
                            >
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {/* Messages */}
        {loading ? (
          <MessageSkeleton />
        ) : (
          <Paper elevation={0} sx={{ m: { xs: 1, sm: 2, md: 3, lg: 5 }, p: 1 }}>
            <div>
              {!isTop && (
                <IconButton
                  sx={{
                    bgcolor: "#28DE37",
                    position: "fixed",
                    bottom: "2%",
                    left: "2%",
                  }}
                  onClick={animateScroll.scrollToTop}
                >
                  <ArrowUpwardIcon fontSize="small" />
                </IconButton>
              )}
              {messages?.map((m) => (
                <div ref={scrollRef}>
                  <Message message={m} own={m.sender?._id === jwt.user._id} />
                </div>
              ))}
            </div>
            <div style={{ padding: "1em" }}>
              <TextField
                // inputRef={(input) => input && input.focus()}
                fullWidth
                placeholder="typing..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
                sx={{ mb: 1 }}
                onKeyDown={enterKey}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Send
                </Button>
                <IconButton
                  sx={{
                    bgcolor: "#626562",
                    position: "fixed",
                    bottom: "1rem",
                    left: { xs: "85%", md: "90%" },
                    fontSize: "5px",
                  }}
                  onClick={animateScroll.scrollToBottom}
                >
                  <ArrowDownwardIcon fontSize="small" />
                </IconButton>
              </Box>
            </div>
          </Paper>
        )}
      </Box>
      <Dialog open={thirdOpen} onClose={handleRenameClose}>
        <DialogTitle align="center">Change Meeting Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            placeholder="Enter Name"
            required
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            sx={{ mb: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameClose}>Cancel</Button>
          <Button onClick={renameChat}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default SingleChat;

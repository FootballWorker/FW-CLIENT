import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import auth from "./../auth/auth-helper";
import { read } from "./../user/api-user";

export default function Conversation({ conversation, currentUser,isError,setIsError }) {
  const [user, setUser] = useState({});
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const friendId = conversation.users?.find(
      (m) => m._id !== currentUser?._id
    );
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: friendId?._id }, { t: jwt.token }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. User could not be uploaded."
        });
      } else {
        setUser(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [currentUser, conversation]);

  return (
    <>
      <ListItemText
        primary={
          <Typography
            sx={{
              wordBreak: "break-all",
              wordWrap: "break-word",
              fontSize: {xs:11,md:14,lg:18},
            }}
          >
            {conversation.isGroupChat ? conversation.chatName : user?.name}{" "}
          </Typography>
        }
      ></ListItemText>
      <ListItemSecondaryAction>
        <Typography sx={{ fontSize: 12 }}>
          {format(conversation?.updatedAt)}
        </Typography>
      </ListItemSecondaryAction>
    </>
  );
}

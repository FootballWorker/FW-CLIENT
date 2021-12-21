import React from "react";
import { format } from "timeago.js";
import { Typography, Box, Avatar } from "@mui/material";

import config from "../config/config";

export default function Message({ message, own }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: own && "flex-end",
        m: 1,
        p: 1,
        bgcolor: own ? "#C4E9C7" : "#C4E2E9",
        borderRadius: "5px",
      }}
    >
      {!own && (
        <Typography sx={{display:'flex', fontSize: 14,fontWeight:500 }} gutterBottom>{message?.sender?.name}</Typography>
      )}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        {own ? (
          <>
            <Typography
              align="right"
              sx={{
                wordBreak: "break-all",
                wordWrap: "break-word",
                hyphens: "auto",
              }}
            >
              {message.text}
            </Typography>
            {/* <Avatar
              src={
                message?.sender
                  ? config.ServerURI +
                    "/api/users/photo/" +
                    message?.sender?._id
                  : ""
              }
            /> */}
          </>
        ) : (
          <>
            <Avatar
              src={
                message?.sender
                  ? config.ServerURI +
                    "/api/users/photo/" +
                    message?.sender?._id
                  : ""
              }
            />
            <Typography
              align="left"
              sx={{
                wordBreak: "break-all",
                wordWrap: "break-word",
                hyphens: "auto",
              }}
            >
              {message.text}
            </Typography>
          </>
        )}
      </Box>
      <Typography sx={{display:'flex', fontSize: 12 }}>{format(message.date)}</Typography>
    </Box>
  );
}

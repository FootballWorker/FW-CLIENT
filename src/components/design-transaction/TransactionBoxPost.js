import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export default function TransactionBoxPost (props){
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      <Typography>Add Post </Typography>
      <Divider variant="middle" />
      <Link
        to={
          "/new/post/" + props.teamId
            ? props.teamId
            : props.playerId
            ? props.playerId
            : props.matchId
            ? props.matchId
            : props.newsId
        }
      >
        <IconButton>
          <AddIcon />
        </IconButton>
      </Link>
    </Box>
  );
};


import React from "react";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import TransactionDelete from "./TransactionDelete";
import TransactionEdit from "../TransactionEdit";
import kFormatter from "../../numbers";

const TransactionPlayer = (props) => {
  return (
    <Paper sx={{ p: 0.8, border: "1px solid #000200" }}>
      <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center',textAlign:'center'}}>
        {/* Add Post */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Link to={"/new/" + props.player._id + "/post"}>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </Box>
        {/* Star Function */}
        <Box
          sx={{
            m: 1,
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {props.stars ? (
            <IconButton
              onClick={props.clickLike}
              color="secondary"
            >
              <StarIcon sx={{ mr: 0.5 }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={props.clickLike}
              color="primary"
            >
              <StarBorderIcon sx={{ mr: 0.5 }} />
            </IconButton>
          )}
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 15,
                md: 17,
              },
            }}
          >
            {kFormatter(props.starLength)}
          </Typography>
        </Box>
        {props.player && props.player.team && props.user.job && props.user.job.title === "president" &&
          props.user.team &&
          props.user.team._id === props.player.team._id && (
            <TransactionEdit link={"/player/edit/" + props.player._id} />
          )}
        {props.user && props.user.role === "admin" && (
          <TransactionDelete player={props.player} />
        )}
      </Box>
    </Paper>
  );
};

export default TransactionPlayer;

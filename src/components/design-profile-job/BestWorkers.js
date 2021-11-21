import React from "react";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListHeader from "../header/ListHeader";
import kFormatter from "../numbers";


export default function BestWorkers (props) {
  return (
    <Paper elevation={12}>
      <ListHeader header="Best Workers" />
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {props.workers ? (
          props.workers.map((item, i) => (
            <Link to={"/users/" + item._id} key={i}>
              <ListItemButton>
                <ListItemText
                  primary={item.name}
                  secondary={item.team && item.team.name}
                />
                <ListItemSecondaryAction sx={{display:'flex',justifyContent:'center',alignItems:'center',textAlign:'center'}} >
                  <PeopleIcon sx={{ mr: "0.5em" }} />
                  {kFormatter(item.followerLength)}
                </ListItemSecondaryAction>
              </ListItemButton>
            </Link>
          ))
        ) : (
          <Typography align="center" variant="body" > No User Found!</Typography>
        )}
      </List>
    </Paper>
  );
};

BestWorkers.propTypes = {
  workers: PropTypes.array
}

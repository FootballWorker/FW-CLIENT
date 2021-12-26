import React from 'react'
import { Link } from 'react-router-dom'
import { format } from "timeago.js";
import PropTypes from 'prop-types'
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListHeader from '../header/ListHeader';

export default function PollsAside(props) {
  return (
    <Paper elevation={1}  >
      <ListHeader header={props.header} />
      <List dense>
        {props.polls &&
          props.polls.map((item, i) => (
            <Link key={i} to={"/polls/" + item._id}>
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={format(item.pollEnd)}
                />
                <ListItemSecondaryAction>
                  <ListItemIcon>
                    <ArrowForwardIcon />
                  </ListItemIcon>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
      </List>
    </Paper>
  );
}

PollsAside.propTypes = {
  polls : PropTypes.array.isRequired,
  header: PropTypes.string
}
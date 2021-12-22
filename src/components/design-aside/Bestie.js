import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import StarIcon from "@mui/icons-material/Star";
import ListHeader from "../header/ListHeader";
import kFormatter from "../numbers";

export default function Bestie(props) {
  return (
    <Paper elevation={4}>
      <ListHeader header={props.header} />
      <List dense>
        {props.values &&
          props.values.map((item, i) => (
            <Link key={i} to={"/teams/" + item._id}>
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={
                    item.members &&
                    "Members : " + kFormatter(item.members?.length)
                  }
                />
                <ListItemSecondaryAction
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <StarIcon />
                  <Typography>{kFormatter(item.starLength)}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
      </List>
    </Paper>
  );
}

Bestie.propTypes = {
  values: PropTypes.array.isRequired,
  header: PropTypes.string,
};

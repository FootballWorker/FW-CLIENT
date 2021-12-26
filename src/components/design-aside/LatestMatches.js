import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import ListHeader from "../header/ListHeader";

export default function LatestMatches(props) {
  return (
    <Paper elevation={1}>
      <ListHeader header={props.header} />
      <List dense>
        {props.matches &&
          props.matches.length > 0 &&
          props.matches.map((item, i) => (
            <Link key={i} to={"/matches/" + item._id}>
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: {
                          xs: "0.85em",
                          sm: "1em",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontWeight: "light",
                        fontSize: {
                          xs: "0.75em",
                          sm: "0.9em",
                        },
                      }}
                    >
                      {"Season : " +
                        item.season +
                        " --- Section : " +
                        item.section}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: {
                        xs: "0.65em",
                        sm: "0.9em",
                      },
                    }}
                  >
                    {format(item.date)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            </Link>
          ))}
      </List>
    </Paper>
  );
}

LatestMatches.propTypes = {
  header: PropTypes.string,
  matches: PropTypes.array,
};

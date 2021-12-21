import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ListHeader from "../header/ListHeader";
import kFormatter from "../numbers";


export default function VacantJobs (props){
  return (
    <Paper elevation={4}>
      <ListHeader header="Vacant Jobs" />
      <Divider />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {props.teams && (
          props.teams.map((item, i) => (
            <Link to={"/teams/" + item._id} key={i}>
              <ListItemButton button>
                <ListItemText
                  primary={item.name}
                  secondary={item.stadium}
                />
                <ListItemSecondaryAction
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <StarIcon sx={{ mr: "0.5em" }} />
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 9,
                        sm: 14,
                        md: 17,
                      },
                    }}
                  >
                    { kFormatter(item.starLength)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </Paper>
  );
};

VacantJobs.propTypes = {
  teams: PropTypes.array
}

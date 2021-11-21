import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import {
  Paper,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



export default function JobsByDepartment (props){
  return (
    <Paper elevation={12}>
      <Typography
        align="center"
        variant="h6"
        gutterBottom
        component="div"
        sx={{
          pt: 1,
          fontFamily: "Raleway",
          fontWeight: 700,
        }}
      >
        Jobs
      </Typography>
      <Divider />
      <List dense>
        {props.jobs ? (
          props.jobs.map((item, i) => (
            <Link to={"/jobs/" + item._id} key={i}>
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
                      {item.title.toUpperCase()}
                    </Typography>
                  }
                />
                <IconButton>
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </ListItemButton>
            </Link>
          ))
        ) : (
          <p>No Job Found!</p>
        )}
      </List>
    </Paper>
  );
};

JobsByDepartment.propTypes = {
  jobs : PropTypes.array.isRequired
}
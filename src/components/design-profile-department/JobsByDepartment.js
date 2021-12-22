import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListHeader from '../header/ListHeader';



export default function JobsByDepartment (props){
  return (
    <Paper elevation={4}>
      <ListHeader header='Jobs' />
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
                      {item.title?.toUpperCase()}
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

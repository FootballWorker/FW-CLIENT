import React from 'react'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import PropTypes from "prop-types";
import { Divider, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import ListHeader from '../header/ListHeader';

export default function PollList(props) {
  return (
    <Paper elevation={4}>
      <ListHeader header="Polls" />
      <Divider />
      <List dense>
        {props.polls && props.polls.map((item, i) => (
          <Link key={i} to={"/polls/" + item._id}>
            <ListItem>
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
                      fontWeight: 400,
                      fontSize: {
                        xs: "0.65em",
                        sm: "1em",
                      },
                    }}
                  >
                    {format(item.created)}
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Paper>
  );
}

PollList.propTypes = {
  polls: PropTypes.array
};
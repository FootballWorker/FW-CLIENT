import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List , ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText ,Paper} from '@mui/material'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ListHeader from '../header/ListHeader';

export default function PollsAside(props) {
  return (
    <Paper elevation={12}  >
      <ListHeader header={props.header} />
      <List dense>
        {props.polls &&
          props.polls.map((item, i) => (
            <Link key={i} to={"/polls/" + item._id}>
              <ListItem>
                <ListItemText
                  primary={item.title}
                  secondary={(new Date(item.pollEnd)).toLocaleString()}
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
import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import PostList from '../components/design-list/PostList'

export default function SearchResults(props) {
  return (
    <div>
        <Paper>
          <List dense sx={{mb:3}} >
            {props.results && (
              props.results.map((item, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={item.name ? item.name : item.title}
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <Link
                        to={
                          item.email
                            ? "/users/" + item._id
                            : item.value
                            ? "/players/" + item._id
                            : item.date
                            ? "/matches/" + item._id
                            : "/teams/" + item._id
                        }
                      >
                        <ArrowRightIcon />
                      </Link>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            )} { (props.results?.length === 0 && props.searched) && (<Typography align="center" variant="subheading" component="h4">
      No data Found! </Typography>)}
                        
          </List>
        </Paper>

        <PostList posts={props.posts} />
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array,
  searched: PropTypes.bool,
  posts : PropTypes.array
}
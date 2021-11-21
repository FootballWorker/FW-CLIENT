import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material'
import StarIcon from "@mui/icons-material/Star";
import ListHeader from '../header/ListHeader';
import kFormatter from '../numbers';


export default function Bestie(props) {
  // function kFormatter(num) {
  //   return Math.abs(num) > 999999
  //     ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "m"
  //     : Math.abs(num) > 999
  //     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
  //     : Math.sign(num) * Math.abs(num);
  // }
  return (
    <Paper elevation={12} >
      <ListHeader header={props.header} />
      <List dense>
        {props.values &&
          props.values.map((item, i) => (
            <Link
              key={i}
              to={"/teams/" + item._id}
            >
              <ListItem>
                <ListItemText
                  primary={item.name}
                  secondary={
                    item.members
                      && "Members : " + kFormatter(item.members.length) 
                  }
                />
                <ListItemSecondaryAction sx={{display: 'flex',gap:1, alignItems:'center',textAlign:'center'}} >
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
  values : PropTypes.array.isRequired,
  header: PropTypes.string
}
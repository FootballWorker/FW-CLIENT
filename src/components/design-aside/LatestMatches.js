import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, ListItemButton, ListItemSecondaryAction, ListItemText, Paper, Typography } from '@mui/material'
import ListHeader from '../header/ListHeader';

export default function LatestMatches(props) {
  return (
    <Paper elevation={12}>
      <ListHeader header={props.header} />
      <List dense>
        {props.matches && props.matches.length > 0 &&
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
                          xs: "0.65em",
                          sm: "0.9em",
                        },
                      }}
                    >
                      {"Season : " + item.season + " --- Section : " + item.section}
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
                    {(new Date(item.date)).toDateString()}
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
  matches: PropTypes.array
}
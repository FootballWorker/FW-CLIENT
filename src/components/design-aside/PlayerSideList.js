import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {config} from './../../config/config.js'
import ListHeader from '../header/ListHeader.js';

export default function PlayerSideList(props) {
  return (
    <Paper elevation={12}>
      <ListHeader header={props.header} />
      <Divider />
      <List dense>
        {props.players && props.players.map((item, i) => (
          <Link to={"/players/" + item._id} key={i}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={item.photo && config.ServerURI + "/api/players/photo/" + item._id } alt="Profile" />
              </ListItemAvatar>
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
                    {item.name}
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
                    {item.position && "Position : " + item.position?.title}
                  </Typography>
                }
              />
              <IconButton>
                <ArrowForwardIcon fontSize="small" />
              </IconButton>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Paper>
  );
}


PlayerSideList.propTypes = {
  players : PropTypes.array,
  header: PropTypes.string
}
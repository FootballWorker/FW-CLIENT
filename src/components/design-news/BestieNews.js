import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";

import { config } from "./../../config/config.js";
import defaultPic from "./../../assets/images/default-news.jpg";
import ListHeader from "../header/ListHeader.js";
import kFormatter from "../numbers.js";

export default function BestieNews(props) {
  return (
    <Paper elevation={1}>
      {props.header && <ListHeader header={props.header} />}
      <List>
        {props.news &&
          props.news.map((item, i) => (
            <Link to={"/news/" + item._id} key={i}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={
                      item.photo
                        ? config.ServerURI + "/news/photo/" + item._id
                        : defaultPic
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    "Total Subscribers : " + kFormatter(item.subscriberLength)
                  }
                />
              </ListItem>
            </Link>
          ))}
      </List>
    </Paper>
  );
}

BestieNews.propTypes = {
  news: PropTypes.array.isRequired,
  header: PropTypes.string,
};

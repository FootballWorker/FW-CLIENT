import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import auth from "./../auth/auth-helper";
import { list, listTop } from "./api-news";
import BestieNews from "../components/design-news/BestieNews";
import DeleteNews from "./DeleteNews";
import SnackError from "../errorHandler/SnackError.js";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import config from "./../config/config.js";
import defaultPic from "./../assets/images/default-news.jpg";
import kFormatter from "../components/numbers";

const News = (props) => {
  const [news, setNews] = useState([]);
  const [besties, setBesties] = useState([]);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load Whole News
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    list({ t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setNews(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Besties
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listTop(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setBesties(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const removeNews = (singleNews) => {
    const updatedNews = [...news];
    const index = updatedNews.indexOf(singleNews);
    updatedNews.splice(index, 1);
    setNews(updatedNews);
  };

  return (
    <Grid container spacing={2} sx={{ p: { xs: 1, sm: 2, md: 3, lg: 6 } }}>
      <Grid item xs={12} sm={5}>
        {loading ? (
          <ListSkelaton />
        ) : (
          <BestieNews news={besties} header="Trending News" />
        )}
      </Grid>
      <Grid item xs={12} sm={7}>
        <Paper elevation={12}>
          <Typography variant="h6" align="center" gutterBottom sx={{ p: 2 }}>
            Whole News
          </Typography>
          <Divider />
          {loading ? (
            <ListSkelaton />
          ) : (
            <List dense>
              {news &&
                news.map((item, i) => (
                  <ListItem key={i} button>
                    <ListItemAvatar>
                      <Avatar
                        src={
                          item.photo
                            ? config.ServerURI + "/api/news/photo/" + item._id
                            : defaultPic
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      secondary={"Total Subscribers : " + kFormatter(item.subscriberLength) }
                    />
                    <ListItemSecondaryAction>
                      {auth.isAuthenticated().user.role === "admin" && (
                        <DeleteNews news={item} onRemove={removeNews} />
                      )}
                      <Link to={"/news/" + item._id}>
                        <IconButton>
                          <ArrowForwardIcon />
                        </IconButton>
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          )}
        </Paper>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Grid>
  );
};

export default News;

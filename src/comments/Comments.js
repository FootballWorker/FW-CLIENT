import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";
import {
  CardMedia,
  Grid,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import auth from "./../auth/auth-helper";
import DeleteComment from "./DeleteComment";
import config from "./../config/config.js";
import kFormatter from "../components/numbers";

export default function Comments(props) {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const jwt = auth.isAuthenticated();

  return (
    <div>
      <Paper>
        {props.header && (
          <Typography
            align="center"
            gutterBottom
            variant="h6"
            sx={{ p: 1, fontWeight: "bold" }}
          >
            {props.header}
          </Typography>
        )}
      </Paper>
      {props.comments && props.comments.length > 0 ? (
        props.comments.map((item, i) => (
          <Card
            key={i}
            sx={{
              margin: "auto",
              mb: 1,
              maxWidth: 600,
              borderRadius: "10px",
              bgcolor: "#fcfcfa",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={
                    item.commentedBy &&
                    config.ServerURI +
                      "/api/users/photo/" +
                      item.commentedBy._id
                  }
                />
              }
              action={
                <Link to={"/comments/" + item._id}>
                  <IconButton>
                    <ArrowForwardIcon aria-label="show more" />
                  </IconButton>
                </Link>
              }
              title={
                <Link to={"/users/" + item.commentedBy._id}>
                  {item.commentedBy.name}
                </Link>
              }
              subheader={new Date(item.created).toLocaleString()}
            />
            <Grid
              container
              spacing={1}
              sx={{ pl: 1, pr: 1, alignItems: "center" }}
            >
              {item.imageOne && (
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="120"
                    image={
                      item.imageOne &&
                      config.ServerURI + "/api/comments/imageOne/" + item._id
                    }
                    alt="Comment Image"
                  />
                </Grid>
              )}
              <Grid item xs={item.imageOne ? 8 : 12}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {isLarge ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        gridArea: "text",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {item.textOne && item.textOne.length < 240
                        ? item.textOne
                        : item.textOne.substring(0, 240) + "..."}
                    </Typography>
                  ) : isMedium ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        gridArea: "text",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {item.textOne && item.textOne.length < 210
                        ? item.textOne
                        : item.textOne.substring(0, 210) + "..."}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        gridArea: "text",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {item.textOne && item.textOne.length < 180
                        ? item.textOne
                        : item.textOne.substring(0, 180) + "..."}
                    </Typography>
                  )}
                </CardContent>
              </Grid>
            </Grid>
            <CardActions
              disableSpacing
              sx={{
                ml: 1,
              }}
            >
              <Tooltip
                title={
                  item.likes?.indexOf(jwt.user?._id) !== -1
                    ? "You liked this comment!"
                    : "You have to read to like!"
                }
                placement="right-end"
              >
                {item.likes?.indexOf(jwt.user?._id) !== -1 ? (
                  <FavoriteIcon color="secondary" sx={{ mr: 0.5 }} />
                ) : (
                  <FavoriteIcon color="primary" sx={{ mr: 0.5 }} />
                )}
              </Tooltip>
              <Typography
                sx={{
                  display: "inline",
                  mr: 2,
                }}
              >
                {kFormatter(item.likeLength)}
              </Typography>
              {item.commentedBy && item.commentedBy._id === jwt.user._id && (
                <DeleteComment comment={item} onRemove={props.removeComment} />
              )}
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography align="center">No Comment Found!</Typography>
      )}
    </div>
  );
}

Comments.propTypes = {
  header: PropTypes.string,
  comments: PropTypes.array.isRequired,
  removeComment: PropTypes.func,
};

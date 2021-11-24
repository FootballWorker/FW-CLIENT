import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  CardMedia,
  Grid,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import config from "./../..//config/config.js";
import ListHeader from "../header/ListHeader.js";
import kFormatter from "../numbers.js";
import auth from "./../../auth/auth-helper";


export default function SideComments(props) {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const jwt = auth.isAuthenticated();
  return (
    <Paper elevation={12}>
      <ListHeader header={props.header} />
      <Divider variant="middle" />
      {props.comments &&
        props.comments.map((item, i) => (
          <Card sx={{ maxWidth: "100%", p: 1 }} key={i}>
            <CardHeader
              avatar={
                <Avatar
                  src={
                    item.commentedBy &&
                    config.ServerURI +
                      "/api/users/photo/" +
                      item.commentedBy._id
                  }
                  sx={{
                    width: {
                      xs: 24,
                      sm: 29,
                    },
                    height: {
                      xs: 24,
                      sm: 29,
                    },
                  }}
                />
              }
              action={
                <Link to={"/comments/" + item._id}>
                  <IconButton>
                    <ArrowForwardIcon aria-label="show more" />
                  </IconButton>
                </Link>
              }
              title={item.commentedBy.name}
              subheader={new Date(item.created).toLocaleString()}
            />
            <Grid container spacing={1} sx={{ p: 1, alignItems: "center" }}>
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
                  {item.title && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        wordWrap: "break-word",
                        hyphens: "auto",
                        fontSize: { xs: 13, md: 22 },
                      }}
                    >
                      {item.title.length < 20
                        ? item.title
                        : item.title.substring(0, 20) + "..."}
                    </Typography>
                  )}
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
                      {item.textOne.substring(0, 300) + "..."}
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
                      {item.textOne.substring(0, 150) + "..."}
                    </Typography>
                  )}
                </CardContent>
              </Grid>
            </Grid>
            <CardActions
              disableSpacing
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
                ml: 1,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  textAlign: "center",
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
                <Typography>{kFormatter(item.likeLength)}</Typography>
              </Box>
              <Box>
                <Link to={"/departments/" + item.department._id}>
                  <Typography variant="body">{item.department.name}</Typography>
                </Link>
                <Divider color="primary" />
                <Link to={"/jobs/" + item.job._id}>
                  <Typography variant="body">
                    {item.job.title && item.job.title.toUpperCase()}
                  </Typography>
                </Link>
              </Box>
            </CardActions>
          </Card>
        ))}
    </Paper>
  );
}

SideComments.propTypes = {
  header: PropTypes.string,
  comments: PropTypes.array.isRequired,
};

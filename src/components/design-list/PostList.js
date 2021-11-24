// Need Check-Up
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Paper, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import PushPinIcon from "@mui/icons-material/PushPin";

import config from "./../../config/config.js";
import auth from "./../../auth/auth-helper";
import DeletePost from "../../post/DeletePost";
import ListHeader from "../header/ListHeader.js";
import kFormatter from "../numbers.js";

const PostList = (props) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const jwt = auth.isAuthenticated();

  return (
    <div>
      <Paper>{props.header && <ListHeader header={props.header} />}</Paper>
      <Box>
        {props.posts &&
          props.posts.length > 0 &&
          props.posts.map((item, i) => {
            return (
              <Card
                sx={{
                  margin: "auto",
                  mb: 2,
                  maxWidth: 700,
                  p: 0.3,
                  borderRadius: "10px",
                  bgcolor: "#fcfcfa",
                }}
                key={i}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 0.5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      ml: 0.1,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src={
                        item.postedBy &&
                        item.postedBy._id &&
                        config.ServerURI +
                          "/api/users/photo/" +
                          item.postedBy._id
                      }
                      sx={{
                        mr: 1.5,
                        width: {
                          xs: 24,
                          sm: 36,
                        },
                        height: {
                          xs: 24,
                          sm: 36,
                        },
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          textAlign: "left",
                          mb: 0.3,
                          fontSize: {
                            xs: 11,
                            sm: 20,
                          },
                          flexWrap: "wrap",
                        }}
                      >
                        <Link
                          to={item.postedBy && "/users/" + item.postedBy._id}
                        >
                          {item.postedBy && item.postedBy.name}
                        </Link>
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontSize: {
                            xs: 9,
                            sm: 14,
                          },
                          flexWrap: "wrap",
                        }}
                      >
                        {new Date(item.created).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mr: 0.2,
                    }}
                  >
                    <Link
                      to={
                        item.department
                          ? "/departments/" + item.department._id
                          : ""
                      }
                    >
                      <Typography
                        sx={{
                          textAlign: "left",
                          p: 0.2,
                          fontSize: {
                            xs: 10,
                            sm: 20,
                          },
                          flexWrap: "wrap",
                        }}
                      >
                        {item.department && item.department.name}
                      </Typography>
                    </Link>
                    <Divider />
                    <Link to={item.job ? "/jobs/" + item.job._id : ""}>
                      <Typography
                        sx={{
                          textAlign: "left",
                          p: 0.2,
                          fontSize: {
                            xs: 10,
                            sm: 20,
                          },
                          flexWrap: "wrap",
                        }}
                      >
                        {item.job &&
                          item.job.title &&
                          item.job.title.toUpperCase()}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
                <Grid
                  container
                  spacing={1}
                  sx={{ pr: 1, pl: 1, alignItems: "center" }}
                >
                  {item.imageOne && (
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={
                          item.imageOne &&
                          config.ServerURI + "/api/posts/imageOne/" + item._id
                        }
                        alt="Post Image"
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
                        <>
                          {isLarge ? (
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{
                                wordWrap: "break-word",
                                hyphens: "auto",
                                fontSize: 22,
                              }}
                            >
                              {item.title && item.title?.length < 30
                                ? item.title
                                : item.title?.substring(0, 30) + "..."}
                            </Typography>
                          ) : isMedium ? (
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{
                                wordWrap: "break-word",
                                hyphens: "auto",
                                fontSize: 19,
                              }}
                            >
                              {item.title && item.title?.length < 25
                                ? item.title
                                : item.title?.substring(0, 25) + "..."}
                            </Typography>
                          ) : (
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{
                                wordWrap: "break-word",
                                hyphens: "auto",
                                fontSize: 16,
                              }}
                            >
                              {item.title && item.title?.length < 22
                                ? item.title
                                : item.title?.substring(0, 22) + "..."}
                            </Typography>
                          )}
                        </>
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
                          {item.textOne && item.textOne.length < 150
                            ? item.textOne
                            : item.textOne.substring(0, 150) + "..."}
                        </Typography>
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
                <CardActions
                  disableSpacing
                  sx={{
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Tooltip
                      title={item.likes?.indexOf(jwt.user?._id) !== -1 ? "You liked this post!" : "You have to read to like!"}
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
                        fontSize: {
                          xs: 12,
                          sm: 19,
                        },
                        mr: 1.9,
                      }}
                    >
                      {kFormatter(item.likeLength)}
                    </Typography>
                    <Visibility sx={{ mr: 0.5 }} />
                    <Typography
                      sx={{
                        display: "inline",
                        fontSize: {
                          xs: 12,
                          sm: 19,
                        },
                      }}
                    >
                      {kFormatter(item.views)}
                    </Typography>
                    {jwt.user &&
                      props.removePost &&
                      item.postedBy &&
                      jwt.user._id === item.postedBy._id && (
                        <DeletePost onRemove={props.removePost} post={item} />
                      )}
                    {item.pinned && <PushPinIcon sx={{ ml: 2 }} />}
                  </Box>
                  <Link to={"/posts/" + item._id}>
                    <Typography
                      sx={{
                        display: "inline",
                        alignItems: "right",
                        fontSize: {
                          xs: 12,
                          sm: 19,
                        },
                      }}
                    >
                      Read More...
                    </Typography>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
      </Box>
    </div>
  );
};

PostList.propTypes = {
  header: PropTypes.string,
  removePost: PropTypes.func,
  posts: PropTypes.array,
};

export default PostList;

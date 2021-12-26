import * as React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Box from "@mui/material/Box";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import ErrorIcon from "@mui/icons-material/Error";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";

import SnackError from "../../errorHandler/SnackError.js";
import auth from "./../../auth/auth-helper";
import { complain } from "./../../post/api-post";
import {config} from "./../../config/config.js";
import kFormatter from "../numbers.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SinglePost(props) {
  const [values, setValues] = React.useState({
    message: "",
    link: window.location.href
  });
  const [open, setOpen] = React.useState(false);
  const [isError, setIsError] = React.useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    const content = {
      user: props.post?.postedBy?.name,
      warning: jwt.user?.name,
      link: values.link
    };

    complain(content).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setOpen(true);
        setValues({...values,message: data.message});
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper
      elevation={12}
      sx={{
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      {props.post.title && (
        <Box
          sx={{
            p: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "0.9em",
                sm: "1.5em",
              },
              fontWeight: "bolder",
              textAlign: "center",
              pt: 1.5,
            }}
          >
            {props.post.title}
          </Typography>
        </Box>
      )}
      {/* Content */}
      <Box
        sx={{
          p: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "0.8em",
              sm: "1.2em",
            },
            overflowWrap: "break-word",
            wordWrap: "break-word",
            hyphens: "auto",
          }}
          variany="body2"
          gutterBottom
        >
          {props.post.textOne}
        </Typography>
        {props.post.imageOne && (
          <img
            src={config.ServerURI + "/posts/imageOne/" + props.post._id}
            alt="Post"
            style={{
              objectFit: "cover",
              maxWidth: "100%",
              maxHeight: "100%",
              justifyContent:'center'
            }}
          />
        )}
        {props.post.textTwo && (
          <Typography
            sx={{
              fontSize: {
                xs: "0.8em",
                sm: "1.2em",
              },
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
            variany="body2"
            gutterBottom
          >
            {props.post.textTwo}
          </Typography>
        )}
        {props.post.textThree && (
          <Typography
            sx={{
              fontSize: {
                xs: "0.8em",
                sm: "1.2em",
              },
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
            variany="body2"
            gutterBottom
          >
            {props.post.textThree}
          </Typography>
        )}
      </Box>
      {/* Actions */}
      {auth.isAuthenticated() && (
        <Box
          sx={{
            p: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* First Part */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {props.isLiked ? (
              <IconButton onClick={props.clickLike} color="secondary">
                <FavoriteIcon
                  sx={{
                    display: "inline",
                    fontSize: {
                      xs: "0.7em",
                      sm: "1.1em",
                    },
                  }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={props.clickLike} color="primary">
                <FavoriteBorderIcon
                  sx={{
                    display: "inline",
                    fontSize: {
                      xs: "0.7em",
                      sm: "1.1em",
                    },
                  }}
                />
              </IconButton>
            )}
            <Typography
              sx={{
                display: "inline",
                mr: {
                  xs: 0,
                  sm: 3,
                },
                fontSize: {
                  xs: "0.7em",
                  sm: "1.1em",
                },
              }}
            >
              {kFormatter(props.likes)}
            </Typography>
            <IconButton>
              <CommentIcon
                sx={{
                  display: "inline",
                  fontSize: {
                    xs: "0.7em",
                    sm: "1.1em",
                  },
                }}
              />
            </IconButton>
            <Typography
              sx={{
                display: "inline",
                fontSize: {
                  xs: "0.7em",
                  sm: "1.1em",
                },
              }}
            >
              {kFormatter(props.comments)}
            </Typography>
          </Box>
          {/* Second Part */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              mr: 1,
            }}
          >
            {/* Add Comment */}
            <Link to={props.post ? "/comment/new/" + props.post._id : ""}>
              <IconButton>
                <AddCommentIcon
                  sx={{
                    fontSize: {
                      xs: "0.7em",
                      sm: "1.1em",
                    },
                    mr: 0.5,
                  }}
                />
              </IconButton>
            </Link>
            {jwt.user &&
              jwt.user.job &&
              jwt.user.news &&
              props.post &&
              props.post.news &&
              jwt.user.job.title === "editor" &&
              jwt.user.news._id === props.post.news._id && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {props.isPinned ? (
                    <IconButton
                      onClick={props.clickPin}
                      aria-label="Pin"
                      color="secondary"
                    >
                      <PushPinIcon
                        sx={{
                          display: "inline",
                          fontSize: {
                            xs: "0.7em",
                            sm: "1.1em",
                          },
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={props.clickPin}
                      aria-label="UnPin"
                      color="secondary"
                    >
                      <PushPinOutlinedIcon
                        sx={{
                          display: "inline",
                          fontSize: {
                            xs: "0.7em",
                            sm: "1.1em",
                          },
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
              )}
            <Tooltip title="Click if you find this post inappropriate." >
              <IconButton onClick={clickSubmit}>
                <ErrorIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      {/* Accordion */}
      <Box
        sx={{
          mt: 1,
        }}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: {
                  xs: "0.85em",
                  sm: "1.2em",
                },
              }}
            >
              INFORMATION
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2.5}>
              <Box gridColumn="span 4">
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                    fontWeight: "bold",
                  }}
                >
                  User
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Department
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Job
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                    fontWeight: "bold",
                  }}
                >
                  Date
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                    fontWeight: "bold",
                  }}
                >
                  {props.post.team && props.post.team.name
                    ? "Team"
                    : props.post.player && props.post.player.name
                    ? "Player"
                    : props.post.news && props.post.news.title
                    ? "News"
                    : "Match"}
                </Typography>
              </Box>
              <Box gridColumn="span 8">
                <Link
                  to={props.post.postedBy && "/users/" + props.post.postedBy._id}
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.75em",
                        sm: "1.1em",
                      },
                    }}
                  >
                    { props.post?.postedBy?.name}
                  </Typography>
                </Link>
                <Link
                  to={
                    props.post.department &&
                    "/departments/" + props.post.department._id
                  }
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.75em",
                        sm: "1.1em",
                      },
                    }}
                  >
                    {props.post?.department?.name}
                  </Typography>
                </Link>
                <Link to={props.post.job && "/jobs/" + props.post.job._id}>
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.75em",
                        sm: "1.1em",
                      },
                    }}
                  >
                    {props.post?.job?.title?.toUpperCase()}
                  </Typography>
                </Link>
                <Typography
                  gutterBottom
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: "0.75em",
                      sm: "1.1em",
                    },
                  }}
                >
                  {format(props.post.created)}
                </Typography>
                <Link
                  to={
                    props.post.team
                      ? "/teams/" + props.post.team._id
                      : props.post.player
                      ? "/players/" + props.post.player._id
                      : props.post.news
                      ? "/news/" + props.post.news._id
                      : props.post.match
                      ? "/matches/" + props.post.match._id
                      : ""
                  }
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    sx={{
                      fontSize: {
                        xs: "0.75em",
                        sm: "1.1em",
                      },
                    }}
                  >
                    {props.post.team
                      ? props.post.team.name
                      : props.post.player
                      ? props.post.player.name
                      : props.post.news
                      ? props.post.news.title
                      : props.post.match
                      ? props.post.match.title
                      : ""}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {values.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

SinglePost.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  isPinned: PropTypes.bool,
  clickLike: PropTypes.func,
  clickPin: PropTypes.func,
};

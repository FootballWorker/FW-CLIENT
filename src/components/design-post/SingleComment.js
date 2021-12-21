import React from 'react'
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import PropTypes from 'prop-types'
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import config from './../../config/config.js'
import { Stack } from '@mui/material';
import kFormatter from '../numbers.js';


export default function SingleComment(props) {
  return (
    <Paper
      elevation={12}
      sx={{
        maxWidth: "100%",
        height: "100%",
      }}
    >
      {props.comment.title && (
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            gap:2,
            textAlign:'center',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <Typography variant="body2" >
            Comment For : 
          </Typography>
          <Link to={props.comment.adherence && "/posts/"+props.comment.adherence._id} >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.9em",
                  sm: "1.5em",
                },
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              {props.comment.title}
            </Typography>
          </Link>
        </Box>
      )}
      {/* Content */}
      <Stack
        spacing={2}
        sx={{
          p: 1.5,
        }}
      >
        {props.comment.imageOne && (
          <img
            src={config.ServerURI + "/api/comments/imageOne/" + props.comment._id}
            alt="Comment"
            style={{
              objectFit: "cover",
              maxHeight:'100%',
              maxWidth: "100%",
            }}
          />
        )}
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
          {props.comment.textOne}
        </Typography>
        
      </Stack>
      {/* Actions */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {props.like ? (
            <IconButton
              onClick={props.clickLike}
              aria-label="Like"
              color="secondary"
            >
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
            <IconButton
              onClick={props.clickLike}
              aria-label="Unlike"
              color="secondary"
            >
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
        </Box>
      </Box>
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
              </Box>
              <Box gridColumn="span 8">
                <Link to={props.comment.commentedBy && "/users/"+props.comment.commentedBy._id}>
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
                    {props.comment.commentedBy && props.comment.commentedBy.name}
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
                  {props.comment.department && props.comment.department.name}
                </Typography>
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
                  {props.comment.job && props.comment.job.title.toUpperCase()}
                </Typography>
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
                  {format(props.comment.created)}
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
}



SingleComment.propTypes = {
  comment: PropTypes.object,
  clickLike: PropTypes.func,
  like: PropTypes.bool,
  likes: PropTypes.number,
  open: PropTypes.bool
}
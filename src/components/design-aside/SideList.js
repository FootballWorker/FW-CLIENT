import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format } from "timeago.js";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {config} from './../..//config/config.js'
import ListHeader from "../header/ListHeader.js";

export default function SideList(props) {
  
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Paper
      elevation={1}
      sx={{
        maxWidth: "100%",
        p: 1,
        bgcolor: "#FFF",
      }}
    >
      {props.header && (
        <>
          <ListHeader header={props.header} />
          <Divider variant="middle" />
        </>
      )}
      {props.posts ? (
        props.posts.map((item, i) => (
          <Box
            key={i}
            sx={{
              mb: 1,
              width: "100%",
              height: "100%",
              "& > .MuiBox-root > .MuiBox-root": {
                p: 1,
                borderRadius: 1,
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateRows: "auto",
                gridTemplateAreas: `"header header header header"
                "main sidebar sidebar sidebar"
                "footer footer footer footer"`,
                borderBottom: "0.1px solid  #2423",
              }}
            >
              <Box sx={{ gridArea: "header" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  {item.title && (
                    <Typography
                      sx={{
                        fontFamily: "-apple-system",
                        fontWeight: 600,
                        textAlign: "left",
                        fontSize:{md:17,lg:20},
                        flexWrap: "wrap",
                      }}
                    >
                      {item.title.length < 40
                        ? item.title
                        : item.title?.substring(0, 40) + "..."}
                    </Typography>
                  )}
                  <Link to={"/posts/" + item._id}>
                    <IconButton>
                      <ArrowForwardIcon color="primary" />
                    </IconButton>
                  </Link>
                </Box>
              </Box>
              {item.imageOne && (
                <Box sx={{ gridArea: "main" }}>
                  <Avatar
                    src={
                      item.imageOne
                        && config.ServerURI + "/posts/imageOne/" + item._id
                    }
                    sx={{ width: 140, height: 140 }}
                    variant="square"
                  />
                </Box>
              )}
              <Box sx={{ gridArea: "sidebar" }}>
                {isLarge ? (
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{
                      mr: 5,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.textOne && item.textOne.substring(0, 240) + "... "}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{
                      mr: 5,
                      wordBreak: "break-all",
                    }}
                  >
                    {item.textOne && item.textOne.substring(0, 120) + "... "}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  gridArea: "footer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Box>
                  <Link to={item.postedBy && "/users/" + item.postedBy._id}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          xs: "0.85em",
                          sm: "1.1em",
                        },
                        fontWeight: "bold",
                        fontFamily: "Arial",
                      }}
                    >
                      {item.postedBy && item.postedBy.name}
                    </Typography>
                  </Link>
                  <Link to={item._id && "/posts/" + item._id}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.6em",
                          sm: "0.9em",
                        },
                        fontWeight: 400,
                        fontFamily: "Arial",
                      }}
                    >
                      {format(item.created)}
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  <Link
                    to={
                      item.department && "/departments/" + item.department._id
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.8em",
                          sm: "1.1em",
                        },
                        fontFamily: '"Helvetica Neue"',
                      }}
                    >
                      {item.department && item.department.name}
                    </Typography>
                  </Link>
                  <Divider variant="middle" />
                  <Link to={"/jobs/" + item.job?._id}>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "0.80em",
                          sm: "1.1em",
                        },
                        fontFamily: '"Helvetica Neue"',
                      }}
                    >
                      {
                        item.job?.title?.toUpperCase()}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>Post not found! </Typography>
      )}
    </Paper>
  );
}

SideList.propTypes = {
  posts: PropTypes.array,
  header: PropTypes.string,
};

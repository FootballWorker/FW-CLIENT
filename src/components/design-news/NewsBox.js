import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {config} from "./../../config/config.js";
import defaultNews from "./../../assets/images/default-news.jpg";

export default function NewsBox(props) {
  return (
    <Paper
      elevation={4}
      sx={{
        margin: "auto",
        p: 2,
        maxWidth: "100%",
        bgcolor: "#51545B",
        ":hover": {
          boxShadow: '4px -4px 4px  #FED829'
        }
      }}
    >
      <Stack spacing={2}>
        <ImageListItem
          sx={{
            objectFit: "cover",
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          <img
            src={
              props.news.photo
                ? config.ServerURI + "/api/news/photo/" + props.news._id
                : defaultNews
            }
            alt="Logo"
            style={{
              borderRadius: "5%",
            }}
          />
        </ImageListItem>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "bold",
              fontFamily: "'Merriweather', serif",
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#FED829",
            }}
          >
            {props.news.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "bold",
              fontFamily: "'Merriweather', serif",
            }}
          >
            Founder
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#FED829",
            }}
          >
            <Link
              style={{ color: "#FED829" }}
              to={
                
                "/users/" + props.news?.creator?._id
              }
            >
              {props.news?.creator?.name}
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "bold",
              fontFamily: "'Merriweather', serif",
            }}
          >
            Editor
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#FED829",
            }}
          >
            <Link
              style={{ color: "#FED829" }}
              to={
                
                "/users/" + props.news?.editor?._id
              }
            >
              {props.news?.editor?.name}
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "bold",
              fontFamily: "'Merriweather', serif",
            }}
          >
            DOF
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#FED829",
            }}
          >
            {new Date(props.news.created).toDateString()}
          </Typography>
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>About</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>{props.news.description}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Employees</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ maxWidth: "100%" }}>
              {
                props.news?.employees?.map((item, i) => (
                  <Link key={i} to={"/users/" + item._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={
                            item._id
                              ? config.ServerURI +
                                "/api/users/photo/" +
                                item._id
                              : "/api/users/defaultphoto"
                          }
                        />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  </Link>
                ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
}

NewsBox.propTypes = {
  news: PropTypes.object,
};

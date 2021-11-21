import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WebIcon from '@mui/icons-material/Web';
import config from './../../config/config.js'
import defaultPic from './../../assets/images/profile-pic.png'


export default function UserProfile (props) {
  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        p: 2,
        maxWidth:'100%',
        height: "100%",
        bgcolor: "#FED829",
        ":hover": {
          boxShadow: '4px -4px 4px #51545B'
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
            src={ props.user &&
              props.user?.photo
                ? config.ServerURI + "/api/users/photo/" + props.user?._id
                : defaultPic
            }
            alt="User Profile"
            style={{
              borderRadius: "2%",
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
              color: "#2F4F4F",
            }}
          >
            {props.user?.name}
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
            Country
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#2F4F4F",
            }}
          >
            {props.user?.country}
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
            Department
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#2F4F4F",
            }}
          >
            <Link
              to={
                props.user?.department &&
                "/departments/" + props.user?.department._id
              }
            >
              {props.user?.department
                ? props.user?.department.name
                : "Department"}
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
            Job
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#2F4F4F",
            }}
          >
            <Link to={props.user?.job ? "/jobs/" + props.user?.job._id : ""}>
              {props.user?.job && props.user?.job.title ? props.user?.job.title.toUpperCase() : "Job"}
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
            Member Of
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#2F4F4F",
            }}
          >
            <Link
              to={
                props.user?.favoriteTeam
                  ? "/teams/" + props.user?.favoriteTeam._id
                  : ""
              }
            >
              {props.user?.favoriteTeam ? props.user?.favoriteTeam.name : "None"}
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
            Work At
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#2F4F4F",
            }}
          >
            <Link
              to={
                props.user?.team
                  ? "/teams/" + props.user?.team._id
                  : props.user?.news
                  ? "/news/"+props.user?.news._id
                  : ""
              }
            >
              {props.user?.team
                ? props.user?.team.name
                : props.user?.news
                ? props.user?.news.title
                : "Nowhere"}
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 1,
            pb: 1,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            textAlign: "center",
          }}
        >
          {props.user?.facebook && (
            <a href={props.user?.facebook} style={{ color: "#51545B" }}>
              <Tooltip title="Go to Facebook Page">
                <FacebookIcon />
              </Tooltip>
            </a>
          )}
          {props.user?.twitter && (
            <a href={props.user?.twitter} style={{ color: "#51545B" }}>
              <Tooltip title="Go to Twitter Page">
                <TwitterIcon />
              </Tooltip>
            </a>
          )}
          {props.user?.instagram && (
            <a href={props.user?.instagram} style={{ color: "#51545B" }}>
              <Tooltip title="Go to Instagram Page">
                <InstagramIcon />
              </Tooltip>
            </a>
          )}
          {props.user?.blog && (
            <a href={props.user?.blog} style={{ color: "#51545B" }}>
              <Tooltip title="Go to Blog Page">
                <WebIcon />
              </Tooltip>
            </a>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
}

import  React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ImageListItem } from "@mui/material";
import profilePic from './../../assets/images/profile-pic.png'
import config from './../../config/config.js'



export default function PlayerBox (props) {
  function numberWithCommas(x) {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Paper
      elevation={12}
      sx={{
        margin: "auto",
        p: 2,
        maxWidth: "100%",
        bgcolor: "#51545b",
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
              props.player.photo
                ? config.ServerURI +"/api/players/photo/" + props.player._id
                : profilePic
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
              color: "#fed829",
            }}
          >
            {props.player.name}
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
            Birthday
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#fed829",
            }}
          >
            {new Date(props.player.birthday).toDateString()}
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
              color: "#fed829",
            }}
          >
            {props.player.country}
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
            Team
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#fed829",
            }}
          >
            <Link
              to={
                props.player &&
                props.player.team &&
                "/teams/" + props.player.team._id
              }
              style={{color: '#fed829'}}
            >
              { props.player?.team?.name}
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
            Position
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#fed829",
            }}
          >
            {props.player &&
              props.player.position &&
              props.player.position.title}
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
            Wage
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#fed829",
            }}
          >
            {numberWithCommas(props.player.salary) + "$"}
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
            Market Value
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: 13,
                sm: 19,
              },
              fontWeight: "medium",
              fontFamily: "'Quicksand', sans-serif",
              color: "#fed829",
            }}
          >
            {numberWithCommas(props.player.value) + "$"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

PlayerBox.propTypes = {
  player: PropTypes.object.isRequired
}

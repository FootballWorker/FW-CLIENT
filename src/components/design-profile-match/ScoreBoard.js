import * as React from "react";
import PropTypes from "prop-types";
import { format } from 'date-fns'
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";

import { Link } from "react-router-dom";
import kFormatter from "../numbers";

export default function ScoreBoard(props) {
  const options = { weekday: 'long', year: '2-digit', month: 'long', day: 'numeric' };
  return (
    <Paper
      elevation={12}
      sx={{
        bgcolor: "#000010",
        width: "100%",
        color: "#00CED1",
      }}
    >
      <Grid
        container
        sx={{
          p: 1,
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={4}>
          <Link style={{color: "#00CED1"}} to={props.match.home && "/teams/"+ props.match.home._id} >
            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 25,
                  md: 30,
                },
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {props.match.home && props.match.home.name}
            </Typography>
          </Link>
        </Grid>
        {props.match.homeScore ? (
          <>
            <Grid item xs={1}>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: {
                    xs: 11,
                    sm: 20,
                    md: 25,
                  },
                  fontWeight: 500,
                  fontFamily: "Orbitron",
                }}
              >
                {props.match.homeScore}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography
                sx={{
                  ml: 1.5,
                  fontSize: {
                    xs: 11,
                    sm: 20,
                    md: 25,
                  },
                  fontWeight: 500,
                  fontFamily: "Orbitron",
                }}
              >
                -
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography
                sx={{
                  mr: 1.5,
                  fontSize: {
                    xs: 11,
                    sm: 20,
                    md: 25,
                  },
                  fontWeight: 500,
                  fontFamily: "Orbitron",
                }}
              >
                {props.match.awayScore}
              </Typography>
            </Grid>
          </>
        ) : (
          <Grid item xs={4}>
            <Typography
              sx={{
                fontSize: {
                  xs: 8,
                  sm: 15,
                  md: 17,
                },
                fontWeight: "light",
                fontFamily: "Orbitron",
                color: "#FED829"
              }}
            >
              {(new Date(props.match.date)).toLocaleString(options)}
            </Typography>
          </Grid>
        )}
        <Grid item xs={4}>
          <Link style={{color: "#00CED1"}} to={props.match.away && "/teams/"+ props.match.away._id} >
            <Typography
              sx={{
                fontSize: {
                  xs: 11,
                  sm: 25,
                  md: 30,
                },
                fontWeight: "bold",
                fontFamily: "Orbitron",
              }}
            >
              {props.match.away ? props.match.away.name : "Deleted"}
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid
        container
        spacing={1}
        sx={{
          mt: 1,
          p: 0.9,
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: {
              xs: 0.3,
              sm: 1,
              md: 2,
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HomeMaxIcon
            sx={{
              ml: 0.9,
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              color: "#FED829"
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
              color: "#FED829"
            }}
          >
            {props.match.home && props.match.home.stadium}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: {
              xs: 0.3,
              sm: 1,
              md: 2,
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CalendarTodayIcon
            sx={{
              ml: 0.9,
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              color: "#FED829"
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
              color: "#FED829"
            }}
          >
            {props.match.season}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: {
              xs: 0.3,
              sm: 1,
              md: 2,
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmojiEventsIcon
            sx={{
              ml: 0.9,
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              color: "#FED829"
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
              color: "#FED829"
            }}
          >
            {props.match.section}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: {
              xs: 0.3,
              sm: 1,
              md: 2,
            },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EventSeatRoundedIcon
            sx={{
              ml: 0.9,
              fontSize: {
                xs: 11,
                sm: 16,
                md: 20,
              },
              color: "#FED829"
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
              color: "#FED829"
            }}
          >
            {props.match.audiences && kFormatter(props.match.audiences.length)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VisibilityIcon
            sx={{
              ml: 0.9,
              fontSize: {
                xs: 17,
                sm: 16,
                md: 20,
              },
              color: "#FED829"
            }}
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
              color: "#FED829"
            }}
          >
            {kFormatter(props.match.views)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}


ScoreBoard.propTypes = {
  match: PropTypes.object.isRequired
}


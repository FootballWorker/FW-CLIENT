import * as React from "react";
import PropTypes from "prop-types";
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
import Timing from "./Timing";
import kFormatter from "../numbers";

export default function ScoreBoard(props) {
  return (
    <Paper
      elevation={4}
      sx={{
        bgcolor: "#292C2C ",
        maxWidth: 1400,
        pt:1.5,
        color: "#00CED1",
        margin:'auto'
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
        <Grid item xs={4} sx={{bgcolor:props.match?.home?.firstColor,borderRadius:'3px'}} >
          <Link style={{ color: props.match?.home?.secondColor}} to={props.match.home && "/teams/"+ props.match.home._id} >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 20,
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
            <Timing endTime={props.match?.date} />
          </Grid>
        )}
        <Grid item xs={4} sx={{bgcolor: props.match.away?.firstColor,borderRadius:'3px' }} >
          <Link style={{color: props.match?.away?.secondColor}} to={props.match.away && "/teams/"+ props.match.away._id} >
            <Typography
              sx={{
                fontSize: {
                  xs: 13,
                  sm: 20,
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
      <Divider variant="middle" sx={{color:'red',bgcolor:'red'}} />
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
              }
            }}
            color="silver"
          />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
            }}
            color="silver"
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
              }
            }}
            color="silver"
          />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
            }}
            color="silver"
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
            }}
            color="silver"
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
            }}
            color="silver"
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
            }}
            color="silver"
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
            }}
            color="silver"
          >
            {kFormatter(props.audiences)}
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
            }}
            color="silver"
          />
          <Typography
            sx={{
              fontSize: {
                xs: 10,
                sm: 16,
                md: 20,
              },
              fontFamily: "Orbitron",
            }}
            color="silver"
          >
            { kFormatter(props.match.views)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}


ScoreBoard.propTypes = {
  match: PropTypes.object.isRequired
}


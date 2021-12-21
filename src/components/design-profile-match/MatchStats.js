import React from "react";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Fade from "@mui/material/Fade";
import HelpIcon from "@mui/icons-material/Help";

import auth from "../../auth/auth-helper";
import { predictHome, predictAway, predictDraw } from "../../match/api-match";
import InfoBox from "../fades/InfoBox";

export default function MatchStats(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = auth.isAuthenticated();

  // Functions

  const clickHome = () => {
    predictHome({ userId: jwt.user._id }, { t: jwt.token }, props.matchId).then(
      (data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          props.setUserStatus({
            ...props.userStatus,
            vote: !props.userStatus.vote,
            voted: data.probability?.users?.length,
            homePercent: data.probability?.homePercent,
            drawPercent: data.probability?.drawPercent,
            awayPercent: data.probability?.awayPercent,
          });
        }
      }
    );
  };

  const clickDraw = () => {
    predictDraw({ userId: jwt.user._id }, { t: jwt.token }, props.matchId).then(
      (data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          props.setUserStatus({
            ...props.userStatus,
            vote: !props.userStatus.vote,
            voted: data.probability?.users?.length,
            homePercent: data.probability?.homePercent,
            drawPercent: data.probability?.drawPercent,
            awayPercent: data.probability?.awayPercent,
          });
        }
      }
    );
  };

  const clickAway = () => {
    predictAway({ userId: jwt.user._id }, { t: jwt.token }, props.matchId).then(
      (data) => {
        if (data?.error) {
          console.log(data.error);
        } else {
          props.setUserStatus({
            ...props.userStatus,
            vote: !props.userStatus.vote,
            voted: data.probability?.users?.length,
            homePercent: data.probability?.homePercent,
            drawPercent: data.probability?.drawPercent,
            awayPercent: data.probability?.awayPercent,
          });
        }
      }
    );
  };

  const total =
    props.userStatus.homePercent +
    props.userStatus.drawPercent +
    props.userStatus.awayPercent;
  const homePercent = (props.userStatus.homePercent * 100) / total;
  const drawPercent = (props.userStatus.drawPercent * 100) / total;
  const awayPercent = (props.userStatus.awayPercent * 100) / total;

  return (
    <Paper
      elevation={1}
      sx={{
        bgcolor: "#F4F6F9",
        borderRadius: "15px",
        maxWidth: 1000,
        margin: "auto",
        mt: 2,
        p: 1,
      }}
    >
      <Typography
        align="center"
        gutterBottom
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 16, sm: 20, md: 25, lg: 30 },
          fontFamily: "'Merriweather', serif",
        }}
      >
        Winning Probability
      </Typography>
      <Grid container sx={{ p: 1 }}>
        <Grid xs={4} sx={{ textAlign: "center", p: 1 }}>
          <Typography
            align="center"
            sx={{
              fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
            }}
          >
            Home Team
          </Typography>
          {jwt.user?._id && !props.userStatus.vote && props.inAllowedDate && (
            <IconButton onClick={clickHome}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          <Fade in={true}>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 13, md: 17, lg: 20 },
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 500,
              }}
            >
              {homePercent.toFixed(2) + " %"}
            </Typography>
          </Fade>
        </Grid>
        <Grid xs={4} sx={{ textAlign: "center", p: 1 }}>
          <Typography
            align="center"
            sx={{
              fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
            }}
          >
            Draw
          </Typography>
          {jwt.user?._id && !props.userStatus.vote && props.inAllowedDate && (
            <IconButton onClick={clickDraw}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          <Fade in={true}>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 13, md: 17, lg: 20 },
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 500,
              }}
            >
              {drawPercent.toFixed(2) + " %"}
            </Typography>
          </Fade>
        </Grid>
        <Grid xs={4} sx={{ textAlign: "center", p: 1 }}>
          <Typography
            align="center"
            sx={{
              fontSize: { xs: 12, sm: 16, md: 20, lg: 24 },
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
            }}
          >
            Away Team
          </Typography>
          {jwt.user?._id && !props.userStatus.vote && props.inAllowedDate && (
            <IconButton onClick={clickAway}>
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          <Fade in={true}>
            <Typography
              sx={{
                fontSize: { xs: 10, sm: 13, md: 17, lg: 20 },
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 500,
              }}
            >
              {awayPercent.toFixed(2) + " %"}
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
          pl: 1,
        }}
      >
        {/* kFormatter */}
        <Typography
          align="center"
          sx={{ fontSize: { xs: 12, sm: 15, md: 17, lg: 20 } }}
        >
          {props.userStatus.voted + " user voted."}
        </Typography>
        <IconButton onClick={handleOpen}>
          <HelpIcon />
        </IconButton>
        <InfoBox
          open={open}
          handleClose={handleClose}
          textOne="- The number of audiences is limited to the capacity of the stadium on which the exhibition will be present."
          textTwo="- The managers and coaches of both teams become audience automatically when the match is created."
          textThree="- You can book a seat until the kick-off , after that it is not possible!"
          textFour="- To vote for the result of the game, you have to be FW. You can vote for it only before the starting of the game."
          textFive="- We highly advise the vice president who created the match that he or she changes the scoreboard from the edit section which only appears to him or her , when any team has scored in real life."
        />
      </Box>
    </Paper>
  );
}

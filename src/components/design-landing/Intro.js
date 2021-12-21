import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";

import Chart from "./../../assets/images/chart.png";
import Poll from "./../../assets/images/polltest.png";
import Team from "./../../assets/images/teamStaff.png";
import Voting from "./../../assets/images/voting.png";
import Match from "./../../assets/images/match.png";
import Soccer from "./../../assets/images/stad.png";
import Business from "./../../assets/images/jobs3.png";
import Meeting from "./../../assets/images/meeting.png";
import teamMeet from "./../../assets/images/meeting2.png";
import newsMobile from "./../../assets/images/newsmobile.png";

export default function Intro() {
  const themes = useTheme();
  const isTablet = useMediaQuery(themes.breakpoints.up("md"));
  return (
    <section id="intro" style={{ background: "#17202A" }}>
      {/* President */}
      <Grid
        container
        direction={isTablet ? "row" : "column-reverse"}
        sx={{ height: "100%", p: 2, pb: 4 }}
      >
        <Grid item sm={5}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
              borderRadius: "10px",
              height: { xs: 250, md: "100%" },
            }}
          >
            <img
              src={isTablet ? Poll : Voting}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
                justifyContent: "center",
                borderRadius: "10px",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            WIN THE ELECTION
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { xs: 1, md: 0, lg: 5 },
              ml: { xs: 1, md: 7 },
              mr: { xs: 1, md: 7 },
              fontSize: { md: 16, lg: 21 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Head the poll among the candidates and become PRESIDENT of your
            dream team! Creating and editing players and hiring and firing
            managers and vice presidents will be under your responsibility!
          </Typography>
        </Grid>
      </Grid>
      {/* Meeting */}
      <Grid
        container
        direction={isTablet ? "row-reverse" : "column-reverse"}
        sx={{
          height: "100%",

          p: 2,
          pb: 4,
          justifyContent: "center",
        }}
      >
        <Grid item sm={5}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
            }}
          >
            <img
              src={isTablet ? Meeting : teamMeet}
              alt="Logo"
              style={{
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
        <Grid item sm={7}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            SET MEETING UP
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              p: { xs: 1, md: 0, lg: 5 },
              ml: { xs: 1, md: 7 },
              mr: { xs: 1, md: 7 },
              fontSize: { md: 16, lg: 21 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Set meetings up and have conversations with your co-workers in your
            team. To be able to do that you must be president of a Football
            Team. In meetings, you can consult your Technical Equipp for
            determining a player's market value or choose the vice president who
            will create the next match. You can sure talk about something else
            as well.
          </Typography>
        </Grid>
      </Grid>
      {/* Job Team */}
      <Grid
        container
        sx={{
          p: 2,
          height: "100%",
          justifyContent: "center",
        }}
        direction={isTablet ? "row-reverse" : "column"}
      >
        <Grid item md={6}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            GET A JOB
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { md: 2, lg: 5 },
              ml: { xs: 2, md: 7 },
              mr: { xs: 2, md: 7 },
              color: "#E1E1D4",
              fontSize: 21,
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            It is possible for you to work for your favorite team! Make the best
            comments , show the world your knowledge of football and apply for a
            job. You have to select BUSINESS or TECHNIQUE department to become
            an employee in a team.
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
              mt: { xs: 5, md: 0 },
              borderRadius: "10px",
            }}
          >
            <img
              src={isTablet ? Team : Business}
              alt="Logo"
              style={{
                maxWidth: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Technical */}
      <Grid
        container
        sx={{
          height: "100%",
        }}
      >
        <Grid item md={8}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 2, lg: 3 },
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            ASSESS PLAYERS
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { xs: 1, md: 1, lg: 5 },
              ml: { xs: 2, md: 7 },
              mr: { xs: 2, md: 7 },
              mb: { xs: 2, md: 0 },
              fontSize: { md: 18, lg: 24 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Lionel Messi, Cristiano Ronaldo, and the others...You can assess
            their attributes on this website. The only thing you have to do is
            work for a team in Technical Staff. Thus, you can assess players of
            the team you work for! For your information, the attributes consist
            of three parts which are TECHNICAL, MENTAL and PHYSICAL. The page of
            the players is created by the president of their clubs.
          </Typography>
        </Grid>

        <Grid item md={4}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
              mt: { xs: 5, md: 0 },
              borderRadius: "10px",
            }}
          >
            <img
              src={Chart}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
                borderRadius: "5px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* Match */}
      <Grid
        container
        sx={{
          height: "100%",

          justifyContent: "center",
          textAlign: "center",
          pb: 3,
        }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 2, md: 2, lg: 3 },
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            EXAMINE THE MATCH
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            sx={{
              p: { xs: 1, md: 1, lg: 5 },
              ml: { xs: 2, md: 7 },
              mr: { xs: 2, md: 7 },
              mb: { xs: 2, md: 0 },
              fontSize: { md: 18, lg: 24 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            You can share your observations, thoughts, and interpretations for a
            football exhibition. These writings take a big part in helping you
            grow your fame and have a job. To be able to write about a game you
            have to BOOK A SEAT and keep in mind that you only could do it till
            the kick-off. By the way, matches are created by vice presidents of
            home teams.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 1, justifyContent: "center" }}>
            <img
              src={isTablet ? Match : Soccer}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
                borderRadius: "5px",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* News */}
      <Grid
        container
        sx={{
          p: { xs: 1, md: 4 },
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Grid item md={4}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 0, lg: 1.5 },
              mt: 1,
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            BECOME A JOURNALIST
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: { md: 2, lg: 0 },
              ml: { xs: 1, md: 2, lg: 6 },
              mr: { xs: 1, md: 2, lg: 6 },
              fontSize: { md: 16, lg: 20 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Choose the JOURNAL department, select your job and become a
            journalist. Apply for any news you like and get the job! Hereby your
            posts in the news will appear every FW!
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              borderRadius: "10px",
              height: { md: 250, lg: 320 },
            }}
          >
            <img
              src={newsMobile}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Typography
            align="center"
            variant="h3"
            color="secondary"
            sx={{
              p: { xs: 1, md: 0, lg: 1.5 },
              mt: 1,
              fontFamily: "'Merriweather', serif",
              fontSize: { xs: 30, md: 35 },
            }}
          >
            ESTABLISH NEWSPAPER
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt: { md: 2, lg: 0 },
              ml: { xs: 1, md: 2, lg: 6 },
              mr: { xs: 1, md: 2, lg: 6 },
              fontSize: { md: 16, lg: 20 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Create a newspaper and hire people who apply for your news!
            Establishing a newspaper is a privilege for only Editors. Be aware
            that editors could not work on any news that has an editor!
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
}

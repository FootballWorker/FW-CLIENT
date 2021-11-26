import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import Chart from "./../../assets/images/chart.png";
import Poll from "./../../assets/images/polltest.png";
import Team from "./../../assets/images/teamStaff.png";
import News from "./../../assets/images/default-news.jpg";


export default function Intro() {
  return (
    <section id="intro">
      {/* Job Team */}
      <Grid container sx={{ height: "100%", bgcolor: "#fed829",borderTopRightRadius:'10px',borderTopLeftRadius:'10px' }}>
        <Grid item md={6}>
          <Typography
            align="center"
            variant="h3"
            sx={{
              p: { md: 2, lg: 3 },
              color: "#51545b",
              fontFamily: "'Merriweather', serif",
              fontSize: 40,
            }}
          >
            GET A JOB
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { md: 2, lg: 5 },
              ml: 7,
              mr: 7,
              fontSize: 21,
              color: "#51545B",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            It is possible for you to work for your favorite team! Make the best comments , show the world your knowledge of football and apply for a job. You have to select BUSINESS or TECHNIQUE department to become an employee in a team. 
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
              borderRadius: "10px",
            }}
          >
            <img
              src={Team}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: 400,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* President */}
      <Grid container sx={{ height: "100%", bgcolor: "#51545b" ,p : 2,pb:4}}>
        <Grid item md={5}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
            }}
          >
            <img
              src={Poll}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            />
          </Box>
        </Grid>
        <Grid item md={7}>
          <Typography
            align="center"
            variant="h3"
            sx={{
              p: { md: 2, lg: 3 },
              color: "#fed829",
              fontFamily: "'Merriweather', serif",
              fontSize: 40,
            }}
          >
            WIN THE ELECTION
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { md: 0, lg: 5 },
              ml: 7,
              mr: 7,
              fontSize: { md: 16, lg: 21 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Head the poll among the candidates and become president of your dream team! Creating and editing players and hiring and firing managers and vice presidents will be under your responsibility!
          </Typography>
        </Grid>
      </Grid>
      {/* Technical */}
      <Grid
        container
        sx={{
          height: "100%",
          bgcolor: "#51545b",
        }}
      >
        <Grid item md={8}>
          <Typography
            align="center"
            variant="h3"
            sx={{
              p: { md: 2, lg: 3 },
              color: "#fed829",
              fontFamily: "'Merriweather', serif",
              fontSize: 40,
            }}
          >
            ASSESS PLAYERS
          </Typography>
          <Typography
            variant="h6"
            sx={{
              p: { md: 1, lg: 5 },
              ml: 7,
              mr: 7,
              fontSize: { md: 18, lg: 24 },
              color: "#E1E1D4",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Lionel Messi, Cristiano Ronaldo and the others...You can assess
            their attributes on this website. The only thing you have to do is
            work for a team. Thus, you can assess players of the team you work
            for! For your information, the attributes consist of three parts
            which are TECHNICAL, MENTAL and PHYSICAL.
          </Typography>
        </Grid>

        <Grid item md={4}>
          <Box>
            <img
              src={Chart}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: "100%",
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
          height: "100%",
          bgcolor: "#fed829",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Grid item md={4}>
          <Typography
            align="center"
            variant="h3"
            sx={{
              p: { md: 0, lg: 1.5 },
              mt:1,
              color: "#51545b",
              fontFamily: "'Merriweather', serif",
              fontSize: 40,
            }}
          >
            BECOME A JOURNALIST
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt:{md:2,lg:0},
              ml: {md:2,lg:6},
              mr: {md:2,lg:6},
              fontSize: { md: 16, lg: 19 },
              color: "#51545B",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Choose the JOURNAL department, select your job and become a journalist. Apply for any news you like and get the job! Hereby your posts in the news will appear every FW!
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              m: 1,
              borderRadius: "10px",
              height:{md:300,lg:350}
            }}
          >
            <img
              src={News}
              alt="Logo"
              style={{
                maxWidth: "100%",
                height: '100%',
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
            sx={{
              color: "#51545b",
              p: { md: 0, lg: 1.5 },
              mt:1,
              fontFamily: "'Merriweather', serif",
              fontSize: 40,
            }}
          >
            ESTABLISH NEWSPAPER
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mt:{md:2,lg:0},
              ml: {md:2,lg:6},
              mr: {md:2,lg:6},
              fontSize: { md: 16, lg: 19 },
              color: "#51545B",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            Create a newspaper and hire people who apply for your news! Establishing a newspaper is a privilege for only Editors. Be aware that editors could not work on any news that has an editor!
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
}

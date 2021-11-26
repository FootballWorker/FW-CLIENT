import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Logo from "./../../assets/images/orijinalLogo.png";
import { animateScroll as scroll } from "react-scroll";
import { Link,useHistory } from "react-router-dom";

export default function LandingHeader({ ScrollLink }) {
  const history = useHistory()
  return (
    <section id="header">
      <Grid
        container
        spacing={1}
        sx={{
          height: "100%",
          bgcolor: "#17202A",
          pb: { md: 12, lg: 15 },
        }}
      >
        <Grid item md={5}>
          <Box
            sx={{
              mt: 10,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100%",
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
            variant="h2"
            sx={{
              p: { md: 2, lg: 5 },
              mt: 3,
              color: "#fed829",
              fontFamily: "'Merriweather', serif",
              fontSize: { md: 40, lg: 50 },
            }}
          >
            FOOTBALL WORKER
          </Typography>
          <Typography
            sx={{
              p: 1,
              color: "#C3C3BE",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
              fontSize: { md: 22, lg: 25 },
            }}
          >
            Show the World Your Knowledge of Football!
          </Typography>
          <Typography
            sx={{
              p: 1,
              color: "#C3C3BE",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
              fontSize: { md: 22, lg: 25 },
            }}
          >
            Become Famous and Attract the Attention of the Football Realm!
          </Typography>
          <Typography
            sx={{
              p: 1,
              color: "#C3C3BE",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: "bold",
              fontSize: { md: 22, lg: 25 },
            }}
          >
            Getting a Job in Real Life!
          </Typography>
          <Box
            sx={{
              pt: 5,
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              justifyContent: "center",
              gap: "1",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Button
                sx={{
                  p: 1.5,
                  bgcolor: "#fed829",
                  ":hover": {
                    bgcolor: "#fed829",
                  },
                }}
              >
                <ScrollLink
                  to="choose"
                  smooth={true}
                  duration={2000}
                  style={{ color: "#51545b" }}
                >
                  Become FW
                </ScrollLink>
              </Button>
            </Box>
            <Box>
              <Button
                sx={{
                  p: 1.5,
                  bgcolor: "#fed829",
                  ":hover": {
                    bgcolor: "#fed829",
                  },
                }}
              >
                <ScrollLink
                  to="intro"
                  smooth={true}
                  duration={3000}
                  style={{ color: "#51545b" }}
                >
                  Tour Website
                </ScrollLink>
              </Button>
            </Box>
            <Box>
              <Button
                color="secondary"
                sx={{
                  p: 1.5,
                  bgcolor: "#fed829",
                  ":hover": {
                    bgcolor: "#fed829",
                  },
                }}
              >
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={2000}
                  style={{ color: "#51545b" }}
                >
                  Contact Us
                </ScrollLink>
              </Button>
            </Box>
          </Box>
          <Stack spacing={1} sx={{ mt: 3 }}>
            <Typography
              align="center"
              sx={{
                fontSize: 22,
                color: "#fed829",
                fontFamily: "'Quicksand', sans-serif",
              }}
            >
              {" "}
              We are a new brand enterprise. We would be grateful for your
              financial help.{" "}
            </Typography>
            <Button
              onClick={() => scroll.scrollToBottom()}
              sx={{
                color: "#C3C3BE",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "1.4em",
                maxWidth: "100%",
              }}
            >
              Become Sponsor or Advertise
            </Button>
            <Typography
              align="center"
              sx={{ color: "#C3C3BE", fontSize: "1em" }}
            >
              footballworker@hotmail.com
            </Typography>
            <Box sx={{ pr: 9, textAlign: "right" }}>
              <Button
                sx={{
                  justifyContent: "space-between",
                  textAlign: "right",
                  alignItems: "flex-end",
                  mt: 2,
                  p: 2,
                  bgcolor: "#51545b",
                  color:'whitesmoke',
                  width: 350,
                  ":hover": {bgcolor:'whitesmoke', color: "#51545b" },
                }}
                onClick={()=> history.push("/home")}
              >
                <Typography>
                  Continue As a Fan
                </Typography>
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </section>
  );
}

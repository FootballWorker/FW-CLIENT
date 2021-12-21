import React from "react";
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Logo from "./../../assets/images/orijinalLogo.png";
import Back from "./../../assets/images/back6.jpg";
import { animateScroll as scroll } from "react-scroll";
import { useHistory } from "react-router-dom";

export default function LandingHeader({ ScrollLink }) {
  const history = useHistory();
  return (
    <section id="header">
      <Grid
        container
        sx={{
          bgcolor: "#17202A",
          backgroundImage: `url(${Back})`,
          backgroundRepeat:'no-repeat',
          backgroundAttachment:'fixed',
          backgroundPosition:'cover',
          p: 1,
          pb: { xs: 2, md: 12, lg: 15 },
        }}
      >
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              mt: { xs: 2, md: 10 },
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
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            mt: { xs: 2, md: 0 },
            pl: { xs: 0, md: 2 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            align="center"
            variant="h2"
            sx={{
              p: { md: 2, lg: 5 },
              mt: 3,
              color: "#fed829",
              fontFamily: "'Merriweather', serif",
              fontSize: {xs:35, md: 40, lg: 50 },
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
              pt: 3,
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
                  <Typography
                    sx={{ fontSize: { xs: 10,sm:15, md: 17 }, fontWeight: 500 }}
                  >
                    Become FW
                  </Typography>
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
                  <Typography
                    sx={{ fontSize: { xs: 10,sm:15, md: 17 }, fontWeight: 500 }}
                  >
                    Tour Website
                  </Typography>
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
                  <Typography
                    sx={{ fontSize: { xs: 10,sm:15, md: 17 }, fontWeight: 500 }}
                  >
                    Recommend
                  </Typography>                  
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
              We are a new brand enterprise. We would be grateful for your
              financial help.
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
            <Box sx={{ pr: 9, textAlign: {xs:'center',md:"right"}, alignItems: {xs:"center",md: "flex-end"} }}>
              <Button
                sx={{
                  alignItems: "center",
                  mt: 2,
                  p: 2,
                  bgcolor: "#51545b",
                  gap: {xs:1,sm:3,md:5,lg:9},
                  borderRadius:'10px',
                  color: "whitesmoke",
                  maxWidth: '100%',
                  ":hover": { bgcolor: "whitesmoke", color: "#51545b" },
                }}
                onClick={() => history.push("/home")}
              >
                <Typography noWrap={true} sx={{ fontSize: { xs: 15, md: 21 } }}>
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

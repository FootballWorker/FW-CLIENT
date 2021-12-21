import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";

import VisibilityIcon from "@mui/icons-material/Visibility";
import kFormatter from "../numbers";

const ChooseMob = (props) => {
  return (
    <section id="choose">
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          pt: 7,
          pb: {
            xs: 4,
            sm: 4,
          },
          maxHeight: "100%",
          bgcolor: "#0C0D0F",
        }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: 23,
            fontWeight: 500,
            color: "#FED829",
          }}
        >
          Choose Your Department
        </Typography>
        <Typography
          align="center"
          sx={{
            pb: 1.5,
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 17,
            color: "#FED829",
          }}
        >
          Become a Football Worker
        </Typography>
        <Stack spacing={2} sx={{ m: 4 }}>
          {props.departments &&
            props.departments.map((item, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: "2",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  bgcolor: "#FED829",
                  borderRadius: "10px",
                  ":hover": { bgcolor: "yellow" },
                }}
              >
                <Typography sx={{ color: "#51545B", fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    to={"/departments/" + item._id}
                    style={{ textDecoration: "none", color: "#51545B" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.9,
                        ":hover": { color: "#05252C" },
                      }}
                    >
                      <VisibilityIcon />
                      <Typography> {kFormatter(item.views)} </Typography>
                    </Box>
                  </Link>
                  <Link
                    to={"/signup/to/" + item._id}
                    style={{ color: "#51545B" }}
                  >
                    <ArrowForwardIosIcon
                      fontSize="large"
                      sx={{ ":hover": { color: "#262E30" } }}
                    />
                  </Link>
                </Box>
              </Box>
            ))}

          <Box
            sx={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              p: 1.5,
              bgcolor: "#FED829",
              borderRadius: "10px",
              ":hover": { bgcolor: "yellow" },
            }}
          >
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "#51545B" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1.9,
                  ":hover": { color: "#05252C" },
                }}
              >
                <Typography> Continue to Work </Typography>
                <DoorSlidingIcon />
              </Box>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              alignItems: "center",
              justifyContent: "center",
              p: 0.5,
              bgcolor: "#FED829",
              borderRadius: "10px",
              ":hover": { bgcolor: "yellow" },
            }}
          >
            <Link
              to="/home"
              style={{ textDecoration: "none", color: "#51545B" }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1.9,
                  ":hover": { color: "#05252C" },
                }}
              >
                <Typography> Go as a Fan ! </Typography>
                <Avatar src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/000000/external-football-shirt-football-icongeek26-linear-colour-icongeek26.png" />
              </Box>
            </Link>
          </Box>
          {/* Accordion */}
          <Box>
            <Typography
              align="center"
              gutterBottom
              sx={{
                mt: 5,
                color: "#F9F581",
                fontSize: 20,
              }}
            >
              Information About Departments
            </Typography>
            {props.departments &&
              props.departments.map((item, i) => (
                <Accordion key={i} sx={{ bgcolor: "#FED829" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: {
                          xs: 16,
                          sm: 20,
                        },
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph variant="body2">
                      {item.aboutOne}
                    </Typography>
                    <Typography paragraph variant="body2">
                      {item.aboutTwo}
                    </Typography>
                    <Typography paragraph variant="body2">
                      {item.aboutThree}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </Box>
          <a
            style={{ color: "whitesmoke", margin: "auto", paddingTop: "1rem" }}
            href="https://icons8.com/icon/7kSj0uThuA0P/football-shirt"
          >
            Football Shirt icon by Icons8
          </a>
        </Stack>
      </Box>
    </section>
  );
};

export default ChooseMob;

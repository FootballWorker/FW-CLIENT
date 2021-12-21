import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import kFormatter from "../numbers";


export default function Choose(props) {
  return (
    <section id="choose">
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
          pt: 7,
          maxHeight: "100%",
          bgcolor:"#0C0D0F"
        }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: 40,
            fontWeight: 500,
            color:'#fed829'
          }}
        >
          CHOOSE YOUR DEPARTMENT
        </Typography>
        <Typography
          align="center"
          sx={{
            pb: 1.5,
            fontFamily: "'Quicksand', sans-serif",
            fontSize: 20,
            color:'#fed829'
          }}
        >
          Become a Football Worker !
        </Typography>
        <Grid container>
          {props.departments &&
            props.departments.map((item, i) => (
              <Grid key={i} md={4}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    maxWidth: "100%",
                    bgcolor: "#17202A",
                    mb: 2,
                    mr: {
                      xs: 0,
                      sm: 0.5,
                      md: 1,
                    },
                    ml: {
                      xs: 0,
                      sm: 0.5,
                      md: 1,
                    },
                  }}
                >
                  <CardContent
                    sx={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#FED829", fontWeight: "bold", pb: 1 }}
                    >
                      {item.name}
                    </Typography>
                    <Link
                      to={"/signup/to/" + item._id}
                      style={{ textDecoration: "none", color: "#FED829" }}
                    >
                      <IconButton
                        sx={{
                          mb: 3,
                          color: "#FED829",
                          padding: 2.5,
                          bgcolor: "#737372",
                          ":hover": {
                            bgcolor: "#FED829",
                            color: "#51545B",
                          },
                        }}
                      >
                        {item.name === "BUSINESS" ? (
                          <AccountBalanceIcon fontSize="large" />
                        ) : item.name === "TECHNIQUE" ? (
                          <SportsSoccerIcon fontSize="large" />
                        ) : (
                          <SupportAgentIcon fontSize="large" />
                        )}
                      </IconButton>
                    </Link>
                    <Link
                      to={"/departments/" + item._id}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          maxWidth: 200,
                          margin: "auto",
                          padding: 2,
                          borderRadius: "8px",
                          bgcolor: "#20B7D5 ",
                          color: "white",
                          display: "flex",
                          gap: 1,
                          justifyContent: "center",
                          textAlign: "center",
                          alignItems: "center",
                          ":hover": {
                            bgcolor: "#0F7489",
                            color: "white",
                          },
                        }}
                      >
                        <ShowChartIcon
                          fontSize="large"
                          sx={{
                            mr: {
                              xs: 3,
                              sm: 3,
                              md: 6,
                            },
                          }}
                        />
                        <Typography> {kFormatter(item.views)} </Typography>
                        <VisibilityIcon />
                      </Box>
                    </Link>
                  </CardContent>
                  <CardActions>
                    <Accordion sx={{ bgcolor: "#FED829", width: "100%" }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ fontWeight: 500 }}>Info</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography paragraph>{item.aboutOne}</Typography>
                        <Typography paragraph>{item.aboutTwo}</Typography>
                        <Typography paragraph>{item.aboutThree}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        {/* <Box
          sx={{
            mt: 3,
            maxWidth: 170,
            display: "flex",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
            p: 1.5,
            bgcolor: "#FED829",
            borderRadius: "4%",
            ":hover": { bgcolor: "yellow" },
          }}
        >
          <Link to="/home" style={{ textDecoration: "none", color: "#51545B" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                borderRadius: "10px",
                gap: 0.9,
                ":hover": { color: "#05252C" },
              }}
            >
              <Typography variant="h6" color="primary">
                Go as a Fan !
              </Typography>
              <Avatar src={Fans} />
            </Box>
          </Link>
        </Box> */}
      </Box>
    </section>
  );
}

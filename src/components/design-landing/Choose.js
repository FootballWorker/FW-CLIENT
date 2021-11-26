import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
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


export default function Choose(props) {
  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  }
  return (
    <section id="choose">
      <Box
        sx={{
          flexGrow: 1,
          p: 5,
          pt: 7,
          maxHeight: "100%",
          bgcolor:"#17202A",
          borderTopLeftRadius:'10px',
          borderTopRightRadius:'10px'
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
                    bgcolor: "#51545B",
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
      </Box>
    </section>
  );
}

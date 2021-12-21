import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ListSkelaton from "../components/skelatons/ListSkelaton";
import { listByTeam  , searchMatchByTeam } from "./api-match.js";
import SnackError from "../errorHandler/SnackError.js";



const data = {
  seasons: [
    "2021/2022",
    "2022/2023",
    "2023/2024",
    "2024/2025",
    "2025/2026",
    "2026/2027",
    "2027/2028",
    "2028/2029",
    "2029/2030",
    "2030/2031",
    "2031/2032",
    "2032/2033",
    "2033/2034",
    "2034/2035",
    "2035/2036",
    "2036/2037",
    "2037/2038",
    "2038/2039",
    "2039/2040",
  ],
  sections: ["League", "Cup", "International"],
};


export default function MatchesByTeam({match}) {
  const [matchList, setMatchList] = useState([])
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [values, setValues] = useState({
    season: '',
    section: '' 
  })
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Load Whole Matches
  useEffect(() => {
    setLoading(true);
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;

    listByTeam({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again." ,
        });
      } else {
        setMatchList(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, [match.params.teamId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  // Filtering Function
  const clickSubmit = () => {
    setProgress(true);
    if(values.season){
      searchMatchByTeam(
        {teamId: match.params.teamId,season:values.season || undefined ,section:values.section}
      ).then((data)=>{
        if(data && data.error){
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Please try again." ,
          });
        }else{
          setMatchList(data)
          setProgress(false);
        }
      })
    }
  }

  return (
    <div> 
      <Grid container spacing={2} sx={{p:2}} >
        <Grid item xs={12} sm={4}>
          <Card sx={{maxWidth:'100%',margin:'auto'}} >
            <TextField
              id="season"
              select
              label="Select Season"
              required
              fullWidth
              value={values.season}
              onChange={handleChange('season')}
              variant="standard"
              sx={{m:2}}
            >
              {data && data.seasons.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              id="section"
              select
              label="Select Section"
              fullWidth
              required
              value={values.section}
              onChange={handleChange('section')}
              variant="standard"
              sx={{m:2}}
            >
              <MenuItem value="All"> All </MenuItem>
              {data.sections.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <CardActions sx={{ margin:'auto', justifyContent:'center', padding: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={clickSubmit}
              >
                Search
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
        <Paper elevation={4}>
            {loading ? (
              <ListSkelaton />
            ) : (
              <>
                <Typography align="center" gutterBottom variant="h6">
                  All Matches
                </Typography>
                <List dense>
                  {matchList ? (
                    matchList.map((item, i) => {
                      return (
                        <Link to={"/matches/" + item._id} key={i}>
                          <ListItem button>
                            <ListItemText
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                              primary={
                                <Grid container>
                                  <Grid xs={4}>
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: 8,
                                          sm: 13,
                                          md: 17,
                                        },
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {item.home && item.home.name}
                                    </Typography>
                                  </Grid>
                                  <Grid xs={4}>
                                    {item.homeScore ? (
                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: 8,
                                            sm: 13,
                                            md: 17,
                                          },
                                        }}
                                      >
                                        {item.homeScore +
                                          " - " +
                                          item.awayScore}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        sx={{
                                          fontSize: {
                                            xs: 8,
                                            sm: 13,
                                            md: 17,
                                          },
                                        }}
                                      >
                                        {new Date(item.date).toDateString()}
                                      </Typography>
                                    )}
                                  </Grid>
                                  <Grid xs={4}>
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: 8,
                                          sm: 13,
                                          md: 17,
                                        },
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {item.away && item.away.name}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton>
                                <ArrowForwardIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Link>
                      );
                    })
                  ) : (
                    <Typography> No Match Found </Typography>
                  )}
                </List>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

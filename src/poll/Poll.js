import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CardActions from "@mui/material/CardActions";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import pollImage from "./../assets/images/poll.png";
import auth from "./../auth/auth-helper";
import { read, vote } from "./api-poll";
import DeletePoll from "./DeletePoll";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";
import kFormatter from "../components/numbers";
import Timer from "./Timer";
import config from "../config/config";
import NotFound from "../components/outside/NotFound";



const Poll = ({ match }) => {
  const [poll, setPoll] = useState({});
  const [values, setValues] = useState({
    candidate: "",
    return: false,
  });
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const jwt = auth.isAuthenticated();

  // Load Poll Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ pollId: match.params.pollId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data?.error == "Poll not found") {
          setRedirect(true)
        }
        else if (data && data.error) {
          setIsError({ ...isError, openSnack: true, error: "500 Server Error. Please try again." });
        } else {
          setPoll(data);
          let isVoted = checkVoter(data);
          setVoted({
            ...voted,
            isVoted: isVoted,
            votedLength: data.voted.length,
          });
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.pollId]);

  const checkVoter = (poll) => {
    const match =
      poll && jwt.user &&
      poll.voted.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [voted, setVoted] = useState({
    isVoted: false,
    votedLength: 0,
  });

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const voteFor = () => {
    vote(
      { pollId: match.params.pollId },
      { t: jwt.token },
      values.candidate
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setVoted({
          ...voted,
          isVoted: !voted.isVoted,
          votedLength: data.voted.length,
        });
        setValues({ ...values, redirect: true });
      }
    });
  };


  if(redirect){
    return <NotFound text="the Poll" />
  }

  if (loading) {
    return <Loading text="Poll is Loading..." />;
  }


  const currentDate = new Date();

  return (
    <div style={{background: '#51545B', color: '#fed829',height:'100vh'}} >
      <Typography align="center" variant="h4" gutterBottom sx={{ p: 2,fontFamily:"'Merriweather', serif"  }}>
        {poll.title}
      </Typography>
      <Grid container spacing={1} sx={{ p: 1 }}>
        <Grid item xs={6}>
          <Typography align="center" variant="h5" sx={{fontFamily:"Raleway"}} >
            Starting Date
          </Typography>
          <Divider variant="middle" />
          <Typography align="center" sx={{ fontFamily:  "'Quicksand', sans-serif",fontSize:{xs:15,sm:18,md:21,fontSize:500} }}>
            {new Date(poll.pollStart).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align="center" variant="h5" sx={{fontFamily:"Raleway" }} >
            Ending Date
          </Typography>
          <Divider variant="middle" />
          <Typography align="center" sx={{ fontFamily:  "'Quicksand', sans-serif",fontSize:{xs:15,sm:18,md:21,fontSize:500}}}>
            {new Date(poll.pollEnd).toLocaleString()}
          </Typography>
        </Grid>
      </Grid>
      <Timer endTime={poll.pollEnd} />
      <Typography align="center" variant="h6" sx={{ p: 2 }}>
        {voted.votedLength + " member" + (voted.votedLength < 1 ? "" : "s" ) +  " voted!"}
      </Typography>
      <Grid
        xs={12}
        sx={{
          bgcolor: `${poll?.team?.secondColor}`,
          maxHeight: "100%",
          p: { xs: 1, md: 5 },
          color: `${poll?.team?.firstColor}`,
          borderRadius: "10px",
        }}
      >
        {voted.isVoted && (
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img
              src={pollImage}
              style={{ width: 200, height: 200, bgcolor: "#FED829" }}
              alt="Voted"
            />
          </Box>
        )}
        <List sx={{margin:'auto',maxWidth:600,pt:2}} >
          {poll &&
            poll.options &&
            poll.options.map((option, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      option.option && config.ServerURI + "/api/users/photo/" + option.option._id
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link style={{color:`${poll?.team?.firstColor}`}} to={option.option && "/users/"+option.option._id} >
                      <Typography variant="h6">
                        {option.option && option.option.name}
                      </Typography>
                    </Link>
                  }
                  secondary={
                    <Typography >
                      {option.option &&
                        "Followers : " + kFormatter(option.option.followerLength)}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction
                  sx={{ alignItems: "center", textAlign: "center" }}
                >
                  <Typography variant="h5">{kFormatter(option.votes)}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        <Divider variant="middle" sx={{ m: 3 }} />
        {currentDate > new Date(poll.pollStart) &&
        currentDate < new Date(poll.pollEnd) ? (
          <div>
            {jwt.user.favoriteTeam &&
              poll.team &&
              jwt.user.favoriteTeam._id === poll.team._id && (
                <div>
                  {voted.isVoted ? (
                    <Typography align="center" variant="h6">
                      You Already Voted !
                    </Typography>
                  ) : (
                    <Card sx={{ maxWidth: 500, width: "100%", margin: "auto",p:2 }}>
                      <TextField
                        id="candidate"
                        select
                        fullWidth
                        required
                        label="Select Candidate"
                        value={values.candidate}
                        onChange={handleChange("candidate")}
                        variant="standard"
                        sx={{
                          m: 1,
                        }}
                      >
                        {poll &&
                          poll.options &&
                          poll.options.map((option) => (
                            <MenuItem
                              key={option.option}
                              value={option.option?._id}
                            >
                              {option.option?.name}
                            </MenuItem>
                          ))}
                      </TextField>
                      <CardActions sx={{justifyContent:'center'}} >
                        <Button
                          variant="contained"
                          sx={{ justifyContent: "center" }}
                          color="secondary"
                          disabled={new Date() > poll.pollEnd}
                          onClick={voteFor}
                        >
                          Vote For
                        </Button>
                      </CardActions>
                    </Card>
                  )}
                </div>
              )}
          </div>
        ) : (
          <Typography component="p" variant="h6" align="center" gutterBottom>
            You are out of the voting date!
          </Typography>
        )}
        {
          jwt.user && jwt.user.role === 'admin' && (
            <Box sx={{margin:'auto'}} >
              <DeletePoll pollId={poll._id}  />
            </Box>
          )
        }
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
};

export default Poll;

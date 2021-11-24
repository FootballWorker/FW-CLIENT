import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


import { read , star, unstar } from "./api-player.js";
import {listByPlayer} from './../post/api-post'
import { listAttributes,averageAttributes } from "./../attribute/api-attribute";
import auth from "./../auth/auth-helper";
import Overall from "../components/design-profile-player/Overall.js";
import PlayerBox from "../components/design-profile-player/PlayerBox.js";
import PostList from "../components/design-list/PostList.js";
import TransactionPlayer from "../components/design-transaction/player/TransactionPlayer.js";
import SnackError from "../errorHandler/SnackError.js";
import AuthenticationError from "../errorHandler/AuthenticationError.js";
import Loading from "../components/loading/Loading";



const Player = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [player, setPlayer] = useState({})
  const [posts, setPosts] = useState([])
  const [average, setAverage] = useState([])
  const [attributes, setAttributes] = useState([])
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Player Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ playerId: match.params.playerId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
	      setPlayer(data)
        let stars = checkLike(data);
        setStarState({
          ...starState,
          stars: stars,
          starLength: data.stars.length,
        });
        // setLoading(false);
        
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.playerId]);

  const checkLike = (player) => {
    const match =
      player && jwt.user &&
      player.stars.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };
  const [starState, setStarState] = useState({
    stars: false,
    starLength: 0,
  });

  // Load Posts
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listByPlayer({ playerId: match.params.playerId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setPosts(data)
        // setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.playerId]);

  // Load Averages
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    averageAttributes({ playerId: match.params.playerId }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setAverage(data)
          // setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.playerId]);

  // Load Attributes
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listAttributes(
      { playerId: match.params.playerId },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setAttributes(data)
        setLoading(false);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [match.params.playerId]);

  // --------------- FUNCTIONS ------------------

  // Delete Attributes
  const removeAttribute = (attribute) => {
    const updatedAttribute = [...attributes];
    const index = updatedAttribute.indexOf(attribute);
    updatedAttribute.splice(index, 1);
    setAttributes(updatedAttribute);
  };

  // Star Function
  const clickStar = () => {
    setProgress(true);
    let callApi = starState.stars ? unstar : star;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      match.params.playerId
    ).then((data) => {
      if (data.error) {
        setOpen(true);
      } else {
        setStarState({
          ...starState,
          stars: !starState.stars,
          starLength: data.stars.length,
        });
        setProgress(false);
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Overall
        player={player}
        average={average}
        attributes={attributes}
        user={jwt.user}
        removeAttribute={removeAttribute}
      />
      {matches ? (
        <Grid container spacing={3} sx={{p:{xs:1,sm:2,md:4,lg:9}}} >
          <Grid item md={7} lg={8}>
            <PostList posts={posts} header="Posts" />
          </Grid>
          <Grid item md={5} lg={4}>
            <Stack spacing={1}>
              <PlayerBox player={player} />
              {auth.isAuthenticated() && (
                <TransactionPlayer
                  player={player}
                  user={jwt.user}
                  clickLike={clickStar}
                  stars={starState.stars}
                  starLength={starState.starLength}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1} sx={{mt:1}}>
          <PlayerBox player={player} />
          {auth.isAuthenticated() && (
            <TransactionPlayer
              player={player}
              user={jwt.user}
              clickLike={clickStar}
              stars={starState.stars}
              starLength={starState.starLength}
            />
          )}
          <PostList posts={posts} />
        </Stack>
      )}
      <AuthenticationError open={open} />
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Player;

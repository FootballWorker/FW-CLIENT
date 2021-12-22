import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import { read, audience, disaudience } from "./api-match.js";
import { listByMatch, listBestMatch } from "../post/api-post";
import PostList from "../components/design-list/PostList.js";
import SideList from "../components/design-aside/SideList.js";
import ScoreBoard from "../components/design-profile-match/ScoreBoard";
import TransactionMatch from "../components/design-transaction/match/TransactionMatch";
import SnackError from "../errorHandler/SnackError";
import AuthenticationError from "../errorHandler/AuthenticationError";
import PostSkelaton from "../components/skelatons/PostSkelaton";
import SideSkeleton from "../components/skelatons/SideSkeleton";
import MatchSkeleton from "../components/skelatons/MatchSkeleton";
import NotFound from "../components/outside/NotFound";
import MatchStats from "../components/design-profile-match/MatchStats";

const Match = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [matchData, setMatchData] = useState({});
  const [posts, setPosts] = useState([]);
  const [bestPosts, setBestPosts] = useState([]);
  const [progress, setProgress] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Loading Match Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ matchId: match.params.matchId }, signal).then((data) => {
      if (data?.error === "Match could not be found") {
        setRedirect(true);
      }
      if (data && data.error) {
        setIsError({ ...isError, open: true, error: "500 Server Error. Match could not be uploaded." });
      } else {
        setMatchData(data);
        let audience = checkAudience(data);
        setAudienceState({
          ...audienceState,
          audience: audience,
          audiences: data.audiences.length,
        });
        let vote = checkUsers(data);
        setUserStatus({
          ...userStatus,
          vote: vote,
          voted: data?.probability?.users?.length,
          homePercent: data.probability?.homePercent,
          drawPercent: data.probability?.drawPercent,
          awayPercent: data.probability?.awayPercent,
        });
        setLoading(false);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.matchId]);

  const checkAudience = (presentMatch) => {
    const match =
      presentMatch &&
      jwt.user &&
      presentMatch.audiences?.some((user) => {
        return user?._id === jwt.user?._id;
      });
    return match;
  };
  const [audienceState, setAudienceState] = useState({
    audience: false,
    audiences: 0,
  });

  const checkUsers = (presentMatch) => {
    const match =
      presentMatch &&
      jwt.user &&
      presentMatch.probability?.users?.includes(jwt.user?._id);
    return match;
  };

  const [userStatus, setUserStatus] = useState({
    vote: false,
    voted: 0,
    homePercent: 0,
    drawPercent: 0,
    awayPercent: 0
  });


  // Loading Posts
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByMatch({ matchId: match.params.matchId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({ ...isError, open: true, error: "500 Server Error. Posts could not be uploaded." });
      } else {
        setPosts(data);
        setLoading(false);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.matchId]);

  // Loading BestPosts
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listBestMatch({ matchId: match.params.matchId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({ ...isError, open: true, error: "500 Server Error. Best Posts could not be uploaded." });
      } else {
        setBestPosts(data);
        setLoading(false);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.matchId]);

  // Audience Functionality
  const clickAudience = () => {
    setProgress(true);
    let callApi = audienceState.audience ? disaudience : audience;
    callApi(
      { userId: jwt.user._id },
      { t: jwt.token },
      match.params.matchId
    ).then((data) => {
      if (data && data.error) {
        setOpen(true);
      } else {
        setAudienceState({
          ...audienceState,
          audience: !audienceState.audience,
          audiences: data.audiences.length,
        });
        setProgress(false);
      }
    });
  };

  if (redirect) {
    return <NotFound text="the Match" />;
  }

  const isOverCapacity =
    matchData.audiences &&
    matchData.home &&
    matchData.audiences.length < matchData.home.stadiumCapacity;


  const currentDate = new Date()
  const dom = new Date(matchData.date)
  const inAllowedDate = currentDate < dom


  return (
    <div>
      {loading ? (
        <MatchSkeleton />
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <ScoreBoard match={matchData} audiences={audienceState.audiences} />
          <MatchStats
            stats={matchData?.probability}
            matchId={matchData._id}
            userStatus={userStatus}
            setUserStatus={setUserStatus}
            inAllowedDate={inAllowedDate}
          />
        </div>
      )}
      {matches ? (
        <Grid
          container
          spacing={1}
          sx={{ pt: 2, pr: { md: 2, lg: 12 }, pl: { md: 2, lg: 12 } }}
        >
          <Grid item md={7}>
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
            ) : (
              <PostList posts={posts} />
            )}
          </Grid>
          <Grid item md={5}>
            <Stack spacing={1}>
              {loading ? (
                <SideSkeleton />
              ) : (
                auth.isAuthenticated() && (
                  <TransactionMatch
                    match={matchData}
                    home={matchData.home}
                    user={jwt.user}
                    clickAudience={clickAudience}
                    audience={audienceState.audience}
                    audiences={audienceState.audiences}
                    capacity={isOverCapacity}
                  />
                )
              )}
              {loading ? (
                [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
              ) : (
                <SideList header="Best Posts" posts={bestPosts} />
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1} sx={{ p: 1 }}>
          {auth.isAuthenticated() && (
            <TransactionMatch
              match={matchData}
              home={matchData.home}
              user={jwt.user}
              clickAudience={clickAudience}
              audience={audienceState.audience}
              audiences={audienceState.audiences}
              capacity={isOverCapacity}
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

export default Match;

import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper.js";
import {
  read,
  star,
  unstar,
  apply,
  cancelApply,
  runFor,
  cancelCandidate,
} from "./api-team.js";
import { listByTeam } from "./../player/api-player";
import { applicants } from "./../user/api-user";
import { latestMatches } from "./../match/api-match";
import {
  listByPresident,
  listByVicePresident,
  listByManager,
  listByCoach,
  listByScout,
  listByYouth,
  listPostByTeam,
} from "./../post/api-post";
import { pollListByTeam } from "./../poll/api-poll";
import TeamStaff from "../components/design-profile-team/TeamStaff.js";
import PostList from "../components/design-list/PostList.js";
import TransactionTeam from "../components/design-transaction/team/TransactionTeam.js";
import WebSiteButton from "./../components/design-button/WebSiteButton";
import CancelButton from "./../components/design-button/CancelButton";
import PlayerSideList from "../components/design-aside/PlayerSideList.js";
import Users from "../components/design-aside/Users.js";
import LatestMatches from "../components/design-aside/LatestMatches";
import PollList from "../components/design-profile-team/PollList.js";
import TeamProfile from "../components/design-profile-team/TeamProfile";
import SnackError from "../errorHandler/SnackError.js";
import AuthenticationError from "../errorHandler/AuthenticationError.js";
import TeamProfileSkeleton from "../components/skelatons/TeamProfileSkeleton.js";
import StaffSkeleton from "../components/skelatons/StaffSkeleton.js";
import PostSkelaton from "../components/skelatons/PostSkelaton.js";
import SideSkeleton from "../components/skelatons/SideSkeleton.js";
import NotFound from "../components/outside/NotFound.js";
import ListSkelaton from "../components/skelatons/ListSkelaton.js";
import { totalValue } from "../stats/api-stats.js";

const Team = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [team, setTeam] = useState({});
  const [players, setPlayers] = useState([]);
  const [postPresident, setPostPresident] = useState([]);
  const [postManager, setPostManager] = useState([]);
  const [postVice, setPostVice] = useState([]);
  const [postCoach, setPostCoach] = useState([]);
  const [postYouth, setPostYouth] = useState([]);
  const [postScout, setPostScout] = useState([]);
  const [total, setTotal] = useState({});
  const [polls, setPolls] = useState([]);
  const [latMatches, setLatMatches] = useState([]);
  const [values, setValues] = useState({
    wholePosts: [],
    applicants: [],
    whole: false,
  });
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // ---------------- LOADING DATA ---------------------

  // Load Team Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Team could not be uploaded."
        });
      } else {
        setTeam(data);
        let stars = checkLike(data);
        setStarState({
          ...starState,
          stars: stars,
          starLength: data.stars.length,
        });
        let applicants = checkApply(data);
        setApplyState({ ...applyState, applicants: applicants });
        let candidate = checkCandidate(data);
        setCandidateState({ ...candidateState, candidate: candidate });
        setLoading(false);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Like Values
  const checkLike = (team) => {
    const match =
      team &&
      jwt.user &&
      team.stars.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [starState, setStarState] = useState({
    stars: false,
    starLength: 0,
  });

  // Application Values
  const checkApply = (team) => {
    const match =
      team &&
      jwt.user &&
      team.application.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [applyState, setApplyState] = useState({
    applicants: false,
  });

  // Candidate Values
  const checkCandidate = (team) => {
    const match =
      team &&
      jwt.user &&
      team.candidates.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [candidateState, setCandidateState] = useState({
    candidate: false,
  });

  // ---------------------------------------------------------------------

  // Load Players
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listByTeam({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Players could not be uploaded."
        });
      } else {
        setPlayers(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of President
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByPresident({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of president could not be uploaded."
        });
      } else {
        setPostPresident(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of Vice-President
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByVicePresident({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of vice president could not be uploaded."
        });
      } else {
        setPostVice(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of Manager
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByManager({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of manager could not be uploaded."
        });
      } else {
        setPostManager(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of Coach
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByCoach({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of coach could not be uploaded."
        });
      } else {
        setPostCoach(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of Scout
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByScout({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of scout could not be uploaded."
        });
      } else {
        setPostScout(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Posts of Youth
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let id = match.params.teamId;

    listByYouth({ teamId: id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts of youth could not be uploaded."
        });
      } else {
        setPostYouth(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Polls
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    pollListByTeam({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Poll could not be uploaded."
        });
      } else {
        setPolls(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Latest Matches
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    latestMatches({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Latest matches could not be uploaded."
        });
      } else {
        setLatMatches(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Load Applicants
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    applicants({ teamId: match.params.teamId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Applicants could not be uploaded."
        });
      } else {
        setValues({ ...values, applicants: data });
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // Total Value
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    totalValue({ teamId: match.params.teamId }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          open: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setTotal(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.teamId]);

  // ------------------- FUNCTIONS ---------------------

  // Load Whole Post
  const clickWholePosts = (e) => {
    setProgress(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPostByTeam(
      { teamId: match.params.teamId },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setOpen(true);
        setProgress(false);
      } else {
        setValues({ ...values, wholePosts: data, whole: true });
        setProgress(false);
      }
    });

    return function () {
      abortController.abort();
    };
  };

  // Click For Staff
  const clickBack = () => {
    setValues({ ...values, whole: false });
  };

  // Candidate Function
  const clickCandidate = () => {
    setProgress(true);
    let id = match.params.teamId;
    let callApi = candidateState.candidate ? cancelCandidate : runFor;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      id
    ).then((data) => {
      if (data.error) {
        setOpen(true);
        setProgress(false);
      } else {
        setCandidateState({
          ...candidateState,
          candidate: !candidateState.candidate,
        });
        setProgress(false);
      }
    });
  };

  // Application Function
  const clickApply = () => {
    setProgress(true);
    let callApi = applyState.applicants ? cancelApply : apply;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      match.params.teamId
    ).then((data) => {
      if (data && data.error) {
        setOpen(true);
        setProgress(false);
      } else {
        setApplyState({ ...applyState, applicants: !applyState.applicants });
        setProgress(false);
      }
    });
  };

  // Star Function
  const clickStar = () => {
    setProgress(true);
    let id = match.params.teamId;
    let callApi = starState.stars ? unstar : star;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      id
    ).then((data) => {
      if (data.error) {
        setOpen(true);
        setProgress(false);
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

  if (redirect) {
    return <NotFound text="the Team" />;
  }

  return (
    <div>
      {loading ? (
        <Stack spacing={1}>
          <TeamProfileSkeleton />
        </Stack>
      ) : (
        <Stack>
          <TeamProfile
            team={team}
            total={total?.sumValue}
            players={players?.length}
          />
          {!matches && (
            <TeamStaff
              president={team.president}
              vicepresidents={team.vicePresident}
              manager={team.manager}
              coach={team.coach}
              scout={team.scout}
              youth={team.youth}
              firstColor={team.firstColor}
              secondColor={team.secondColor}
            />
          )}
        </Stack>
      )}
      {matches ? (
        <Grid
          container
          spacing={matches ? 5 : 2}
          sx={{ mt: 2, pr: { md: 3, lg: 8 }, pl: { md: 3, lg: 8 } }}
        >
          <Grid item md={7}>
            {loading ? (
              <StaffSkeleton />
            ) : (
              <div>
                <TeamStaff
                  president={team.president}
                  vicepresidents={team.vicePresident}
                  manager={team.manager}
                  coach={team.coach}
                  scout={team.scout}
                  youth={team.youth}
                  firstColor={team.firstColor}
                  secondColor={team.secondColor}
                />
                {auth.isAuthenticated() && (
                  <Paper
                    elevation={12}
                    sx={{
                      mb: 1,
                      p: 1,
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <WebSiteButton onClick={clickWholePosts} text="Whole" />
                    <CancelButton onClick={clickBack} text="Staff" />
                  </Paper>
                )}
              </div>
            )}
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
            ) : !values.whole ? (
              <>
                <PostList posts={postPresident} header="Posts of President" />
                <PostList posts={postVice} header="Posts of Vice Presidents" />
                <PostList posts={postManager} header="Posts of Manager" />
                <PostList posts={postCoach} header="Posts of Coachs" />
                <PostList posts={postScout} header="Posts of Scouts" />
                <PostList posts={postYouth} header="Posts of Youth Staff" />
              </>
            ) : (
              <PostList posts={values.wholePosts} header="Whole Posts" />
            )}
          </Grid>
          <Grid item md={5}>
            {loading ? (
              <div>
                <ListSkelaton />
                <SideSkeleton />
                <ListSkelaton />
              </div>
            ) : (
              <Stack spacing={1}>
                <PlayerSideList players={players} header="Players" />
                {auth.isAuthenticated() && (
                  <TransactionTeam
                    team={team}
                    user={auth.isAuthenticated() && auth.isAuthenticated().user}
                    clickLike={clickStar}
                    stars={starState.stars}
                    starLength={starState.starLength}
                    clickApply={clickApply}
                    applicant={applyState.applicants}
                    clickCandidate={clickCandidate}
                    candidate={candidateState.candidate}
                  />
                )}
                <Users header="Candidates" users={team && team.candidates} />
                {latMatches?.length >= 1 && (
                  <LatestMatches matches={latMatches} header="Latest Matches" />
                )}
                {
                  polls?.length >= 1 && <PollList polls={polls} />
                }
                {auth.isAuthenticated() &&
                  (jwt.user?._id === team.president?._id ||
                    jwt.user?._id === team.manager?._id) && (
                    <Users
                      header="Applicants"
                      users={values.applicants}
                      team={team}
                      setTeam={setTeam}
                    />
                  )}
              </Stack>
            )}
          </Grid>
        </Grid>
      ) : loading ? (
        <div>
          <StaffSkeleton />
          <ListSkelaton />
          {[1, 2, 3, 4, 5].map((n) => (
            <PostSkelaton key={n} />
          ))}
        </div>
      ) : (
        <Stack spacing={1} sx={{ m: { xs: 1, sm: 2 } }}>
          <PlayerSideList players={players} header="Players" />
          <LatestMatches matches={latMatches} header="Latest Matches" />
          {auth.isAuthenticated() && (
            <TransactionTeam
              team={team}
              user={auth.isAuthenticated() && auth.isAuthenticated().user}
              clickLike={clickStar}
              stars={starState.stars}
              starLength={starState.starLength}
              clickApply={clickApply}
              applicant={applyState.applicants}
              clickCandidate={clickCandidate}
              candidate={candidateState.candidate}
            />
          )}
          {auth.isAuthenticated() && (
            <Paper
              elevation={8}
              sx={{
                mb: 1,
                p: 1,
                display: "flex",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <WebSiteButton onClick={clickWholePosts} text="Whole" />
              <CancelButton onClick={clickBack} text="Staff" />
            </Paper>
          )}
          {!values.whole ? (
            <>
              <PostList posts={postPresident} header="Posts of President" />
              <PostList posts={postVice} header="Posts of Vice Presidents" />
              <PostList posts={postManager} header="Posts of Manager" />
              <PostList posts={postCoach} header="Posts of Coachs" />
              <PostList posts={postScout} header="Posts of Scouts" />
              <PostList posts={postYouth} header="Posts of Youth Staff" />
            </>
          ) : (
            <PostList posts={values.wholePosts} header="Whole Posts" />
          )}
        </Stack>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
      <AuthenticationError open={open} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Team;

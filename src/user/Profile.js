import React, { useEffect, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { listByUser } from "./../post/api-post";
import { listLikedTeam } from "./../team/api-team";
import { totalUser, totalUserComment } from "./../stats/api-stats";
import PostList from "../components/design-list/PostList";
import UserProfile from "../components/design-profile-user/UserProfile";
import TransactionUser from "../components/design-transaction/user/TransactionUser";
import UserStats from "../stats/UserStats";
import PostSkelaton from "../components/skelatons/PostSkelaton";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import NotFound from "../components/outside/NotFound";
import TopSection from "../components/design-profile-user/TopSection";
import Bestie from "../components/design-aside/Bestie";
import UserSkeleton from "../components/skelatons/UserSkeleton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    open: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [teams, setTeams] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [totalPostLikes, setTotalPostLikes] = useState({});
  const [totalCommentLikes, setTotalCommentLikes] = useState({});
  const jwt = auth.isAuthenticated();

  // Load User Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data?.error === "User not found") {
          setRedirect(true);
        } else if (data && data.error) {
          setIsError({ ...isError, open: true, error: "500 Server Error. User could not be uploaded." });
        } else {
          setUser(data);
          let following = checkFollow(data);
          setFollowState({
            ...followState,
            following: following,
            followers: data.followers?.length,
          });
          // setLoading(false);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const checkFollow = (user) => {
    const isMatch =
      user &&
      jwt.user &&
      user.followers.some((follower) => {
        return follower._id === jwt.user._id;
      });
    return isMatch;
  };
  const [followState, setFollowState] = useState({
    following: false,
    followers: 0,
  });

  // Load Teams
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listLikedTeam(
      { userId: match.params.userId },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          open: true,
          error: "500 Server Error. Teams could not be uploaded."
        });
      } else {
        setTeams(data);
        setLoading(false);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  // Follow Button System
  const clickFollowButton = (callApi) => {
    setProgress(true);
    callApi(
      { userId: jwt.user._id },
      { t: jwt.token },
      match.params.userId
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          error: "500 Server Error. Follow function do not work .",
          open: true,
        });
      } else {
        setFollowState({
          ...followState,
          following: !followState.following,
          followers: data.followers?.length,
        });
        setProgress(false);
      }
    });
  };

  // Load Posts Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    // setLoading(true);

    listByUser({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            open: true,
            error: "500 Server Error. Posts could not be uploaded."
          });
        } else {
          setPosts(data);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  // Load Total Likes
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    totalUser({ userId: match.params.userId }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          error: "500 Server Error. Please try again.",
          open: true,
        });
      } else {
        setTotalPostLikes(data);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  // Load Total Comments
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    totalUserComment({ userId: match.params.userId }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          error: "500 Server Error. Please try again.",
          open: true,
        });
      } else {
        setTotalCommentLikes(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  // Handle SnackBar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsError({ ...isError, open: false });
  };

  // Delete Post
  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  // ------------ Hire and Fire Functions ----------------

  // Team
  const presidentButton = (callApi) => {
    let teamId = user.favoriteTeam && user.favoriteTeam._id;
    let userId = match.params.userId;
    if (teamId && userId) {
      callApi({ userId: userId }, { t: jwt.token }, teamId).then((data) => {
        if (data.error) {
          setIsError({
            ...isError,
            error: "500 Server Error. Please try again.",
            open: true,
          });
        } else {
          setUser(data);
        }
      });
    } else {
      setIsError({ ...isError, error: "Team not found!", open: true });
    }
  };

  const firingTeam = (callApi) => {
    let teamId = user.team && user.team._id;
    if (teamId) {
      callApi({ userId: match.params.userId }, { t: jwt.token }, teamId).then(
        (data) => {
          if (data?.error) {
            setIsError({
              ...isError,
              error: "500 Server Error. Please try again.",
              open: true,
            });
          } else {
            setUser(data);
          }
        }
      );
    } else {
      setIsError({ ...isError, error: "Team not found!", open: true });
    }
  };

  // Newspaper

  const editorButton = (callApi) => {
    let newsId = user.news && user.news._id;
    if (newsId) {
      callApi({ userId: match.params.userId }, { t: jwt.token }, newsId).then(
        (data) => {
          if (data?.error) {
            setIsError({
              ...isError,
              error: "500 Server Error. Please try again.",
              open: true,
            });
          } else {
            setUser(data);
          }
        }
      );
    } else {
      setIsError({ ...isError, error: "News not found!", open: true });
    }
  };

  const employeeButton = (callApi) => {
    let newsId = jwt.user.news && jwt.user.news._id;
    if (newsId) {
      callApi({ userId: match.params.userId }, { t: jwt.token }, newsId).then(
        (data) => {
          if (data?.error) {
            setIsError({
              ...isError,
              error: "500 Server Error. Please try again.",
              open: true,
            });
          } else {
            setUser(data);
          }
        }
      );
    } else {
      setIsError({ ...isError, error: "News not found!", open: true });
    }
  };

  if (redirect) {
    return <NotFound text="the User" />;
  }

  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      {loading ? (
        <UserSkeleton />
      ) : (
        <Grid
          container
          spacing={2}
          sx={{
            mb: { xs: 2, md: 0 },
            pl: { sm: 1, md: 5, lg: 14 },
            pr: { sm: 1, md: 5, lg: 14 },
          }}
        >
          <Grid item xs={12} md={7} lg={8}>
            <TopSection user={user} isError={isError} setIsError={setIsError} />
            <UserStats
              postLike={totalPostLikes?.sumLikes}
              commentLike={totalCommentLikes?.sumLikes}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            lg={4}
            sx={{ mt: { xs: 0, md: 0 }, mr: { xs: 2, md: 0 } }}
          >
            <Stack spacing={1}>
              <UserProfile user={user} />
              <TransactionUser
                staff={jwt.user}
                user={user}
                followButton={clickFollowButton}
                following={followState.following}
                followers={followState.followers}
                followings={user.following?.length}
                presidentButton={presidentButton}
                firingTeam={firingTeam}
                editorButton={editorButton}
                employeeButton={employeeButton}
              />
            </Stack>
          </Grid>
        </Grid>
      )}
      {matches ? (
        <Grid
          container
          spacing={2}
          sx={{ pt: 2, pr: { md: 3, lg: 12 }, pl: { md: 3, lg: 12 } }}
        >
          <Grid item md={7} lg={8}>
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
            ) : (
              <PostList posts={posts} removePost={removePost} />
            )}
          </Grid>
          <Grid
            item
            md={5}
            lg={4}
            sx={{ mt: { xs: 0, md: 0 }, mr: { xs: 1, md: 0 } }}
          >
            {loading ? (
              <ListSkelaton />
            ) : (
              <Bestie values={teams} header="Starred Teams" />
            )}
          </Grid>
        </Grid>
      ) : (
        <div style={{ marginTop: "1em" }}>
          {loading ? (
            [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
          ) : (
            <PostList posts={posts} removePost={removePost} />
          )}
        </div>
      )}
      <Snackbar
        open={isError.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {isError.error}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
};

export default Profile;

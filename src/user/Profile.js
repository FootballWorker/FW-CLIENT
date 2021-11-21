import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Paper,
  Snackbar,
  useTheme,
  useMediaQuery,
  Grid,
  Stack,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";

import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { listByUser } from "./../post/api-post";
import PostList from "../components/design-list/PostList";
import UserProfile from "../components/design-profile-user/UserProfile";
import TransactionUser from "../components/design-transaction/user/TransactionUser";
import Loading from "../components/loading/Loading";

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
  const [redirect, setRedirect] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load User Data
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    read({ userId: match.params.userId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({ ...isError, open: true, error: data.error });
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

  // Follow Button System
  const clickFollowButton = (callApi) => {
    setProgress(true);
    callApi(
      { userId: jwt.user._id },
      { t: jwt.token },
      match.params.userId
    ).then((data) => {
      if (data && data.error) {
        setIsError({ ...isError, error: data.error, open: true });
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
          setIsError({ ...isError, open: true, error: data.error });
        } else {
          setPosts(data);
          setLoading(false);
        }
      }
    );

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
          setIsError({ ...isError, error: data.error, open: true });
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
            setIsError({ ...isError, error: data.error, open: true });
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
            setIsError({ ...isError, error: data.error, open: true });
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
            setIsError({ ...isError, error: data.error, open: true });
          } else {
            setUser(data);
          }
        }
      );
    } else {
      setIsError({ ...isError, error: "News not found!", open: true });
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <Paper elevation={4} sx={{ p: 1 }}>
      {matches ? (
        <Grid container spacing={3} sx={{ p: { md: 4, lg: 9 } }}>
          <Grid item md={7} lg={8}>
            <PostList posts={posts} removePost={removePost} />
          </Grid>
          <Grid item md={5} lg={4}>
            <Stack spacing={1}>
              <UserProfile user={user} />
              {auth.isAuthenticated() && (
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
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1}>
          <UserProfile user={user} />
            {auth.isAuthenticated() && (
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
            )}
          <PostList posts={posts} removePost={removePost} />
        </Stack>
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

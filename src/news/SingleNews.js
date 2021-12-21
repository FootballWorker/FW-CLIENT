import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import {
  read,
  apply,
  cancelApply,
  subscribe,
  unsubscribe,
} from "./api-news.js";
import { listPinned, postListByNews } from "./../post/api-post";
import { newsApplicants } from "./../user/api-user";
import { totalNews, totalFollowers } from "./../stats/api-stats";
import NewsStats from "../stats/NewsStats";
import PostList from "../components/design-list/PostList";
import Users from "../components/design-aside/Users";
import TransactionNews from "../components/design-transaction/news/TransactionNews";
import NewsBox from "../components/design-news/NewsBox";
import AuthenticationError from "../errorHandler/AuthenticationError.js";
import SnackError from "../errorHandler/SnackError.js";
import ListSkelaton from "../components/skelatons/ListSkelaton";
import ProfileSkelaton from "../components/skelatons/ProfileSkelaton";
import PostSkelaton from "../components/skelatons/PostSkelaton";
import NotFound from "../components/outside/NotFound";
import StatsSkeleton from "../components/skelatons/StatsSkeleton";

import { Stack } from "@mui/material";

const SingleNews = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [news, setNews] = useState({});
  const [posts, setPosts] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [follow, setFollow] = useState({});
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [redirect, setRedirect] = useState(false);
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load News Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ newsId: match.params.newsId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data?.error === "Could not retrieve News") {
          setRedirect(true);
        } else if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Please try again.",
          });
        } else {
          let employee = checkEmployee(data);
          setEmpState({ ...empState, employee: employee });
          let applied = checkApply(data);
          setStateApply({ ...stateApply, applied: applied });
          let subscribe = checkSubs(data);
          setStateSubs({
            ...stateSubs,
            subscribe: subscribe,
            subsLength: data.subscribers.length,
          });
          setNews(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  const checkEmployee = (news) => {
    const match =
      news &&
      jwt.user &&
      news.employees.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };
  const [empState, setEmpState] = useState({
    employee: false,
  });

  const checkApply = (news) => {
    const match =
      news &&
      jwt.user &&
      news.applications.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [stateApply, setStateApply] = useState({
    applied: false,
  });

  const checkSubs = (news) => {
    const match =
      news &&
      jwt.user &&
      news.subscribers.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };

  const [stateSubs, setStateSubs] = useState({
    subscribe: false,
    subsLength: 0,
  });

  // Load Pinned Posts
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listPinned({ newsId: match.params.newsId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error. Please try again.",
          });
        } else {
          setPinnedPosts(data);
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // Load Whole Posts
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    postListByNews({ newsId: match.params.newsId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setPosts(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // Load Applicants
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    newsApplicants({ newsId: match.params.newsId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setApplicants(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // Load Total Likes
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    totalNews({ newsId: match.params.newsId }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setLikes(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // Load Total Followers
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    totalFollowers({ newsId: match.params.newsId }, signal).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Please try again.",
        });
      } else {
        setFollow(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.newsId]);

  // ------- Functions ---------

  // Application Function
  const applyClick = () => {
    setProgress(true);
    let callApi = stateApply.applied ? cancelApply : apply;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      match.params.newsId
    ).then((data) => {
      if (data && data.error) {
        setOpen(true);
        setProgress(false);
      } else {
        setStateApply({
          ...stateApply,
          applied: !stateApply.applied,
        });
        setProgress(false);
      }
    });
  };

  // Subscribe Function
  const subscribeClick = () => {
    setProgress(true);
    let callApi = stateSubs.subscribe ? unsubscribe : subscribe;
    callApi(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      match.params.newsId
    ).then((data) => {
      if (data.error) {
        setOpen(true);
        setProgress(false);
      } else {
        setStateSubs({
          ...stateSubs,
          subscribe: !stateSubs.subscribe,
          subsLength: data.subscribers.length,
        });
        setProgress(false);
      }
    });
  };

  if (redirect) {
    return <NotFound text="the News" />;
  }

  return (
    <div>
      {matches ? (
        <Grid container spacing={3} sx={{ p: { xs: 1, sm: 2, md: 3, lg: 7 } }}>
          <Grid item md={7} lg={8}>
            {loading ? (
              <div>
                <StatsSkeleton />
                {[1, 2, 3].map((n) => (
                  <PostSkelaton key={n} />
                ))}
              </div>
            ) : (
              <Stack>
                <NewsStats
                  postLike={likes?.sumLikes}
                  followLength={follow?.sumLikes}
                />
                <PostList
                  posts={pinnedPosts}
                  header={pinnedPosts && "Pinned Posts"}
                />
                <Divider variant="middle" sx={{ pb: 5 }} />
                <PostList posts={posts} header="Latest" />
              </Stack>
            )}
          </Grid>
          <Grid item md={5} lg={4}>
            <Stack spacing={1}>
              {loading ? <ProfileSkelaton /> : <NewsBox news={news} />}
              {auth.isAuthenticated() && (
                <TransactionNews
                  applyClick={applyClick}
                  subscribeClick={subscribeClick}
                  user={jwt.user}
                  news={news}
                  employee={empState.employee}
                  applied={stateApply.applied}
                  subscribe={stateSubs.subscribe}
                  subs={stateSubs.subsLength}
                />
              )}
              {loading ? (
                <ListSkelaton />
              ) : (
                ((news.editor && jwt.user._id === news.editor._id) ||
                  jwt.user.role === "admin") && (
                  <Users header="Applicants" users={applicants} news={news} />
                )
              )}
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <div>
        {loading ? (
          <div>
            <ProfileSkelaton />
            <StatsSkeleton />
            {[1, 2, 3].map((n) => (
              <PostSkelaton key={n} />
            ))}
          </div>
        ) : (
          <Stack spacing={1} sx={{ p: 0.4 }}>
            <NewsBox news={news} />
            {auth.isAuthenticated() && (
              <TransactionNews
                applyClick={applyClick}
                subscribeClick={subscribeClick}
                user={jwt.user}
                news={news}
                employee={empState.employee}
                applied={stateApply.applied}
                subscribe={stateSubs.subscribe}
                subs={stateSubs.subsLength}
              />
            )}
            <NewsStats
              postLike={likes?.sumLikes}
              followLength={follow?.sumLikes}
            />
            <PostList
              posts={pinnedPosts}
              header={pinnedPosts && "Pinned Posts"}
            />
            <Divider variant="middle" sx={{ pb: 5 }} />
            <PostList posts={posts} header="Latest" />
          </Stack>
        )}
      </div>
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

export default SingleNews;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import auth from "./../../auth/auth-helper";
import { listByFollowings, latestTeam } from "./../../post/api-post";
import { listByUser } from "./../../news/api-news";
import { openPolls } from "./../../poll/api-poll";
import { listForHome } from "./../../match/api-match";

import Search from "../../search/Search";
import SideList from "../../components/design-aside/SideList";
import Bestie from "../../components/design-aside/Bestie";
import PollsAside from "../../components/design-aside/PollsAside";
import BestieNews from "../../components/design-news/BestieNews";
import LatestMatches from "../../components/design-aside/LatestMatches";
import SnackError from "../../errorHandler/SnackError";
import ListSkelaton from "../../components/skelatons/ListSkelaton";
import PostSkelaton from "../../components/skelatons/PostSkelaton";
import SearchSkeleton from "../../components/skelatons/SearchSkeleton";

export default function HomeWorkers(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [following, setFollowing] = useState([]);
  const [news, setNews] = useState([]);
  const [latMatches, setLatMatches] = useState([]);
  const [latest, setLatest] = useState([]);
  const [values, setValues] = useState({
    polls: [],
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Posts From Followings
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByFollowings({ userId: jwt.user._id }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts could not be uploaded."
        });
      } else {
        setFollowing(data);
        // setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [jwt.user._id]);

  // Load Latest Match From Country
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listForHome({ t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Matches could not be uploaded."
        });
      } else {
        setLatMatches(data);
        // setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Latest Posts From Team
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    latestTeam({ t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts from team could not be uploaded."
        });
      } else {
        setLatest(data);
        // setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Polls
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    openPolls(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Polls could not be uploaded."
        });
      } else {
        setValues({ ...values, polls: data });
        // setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Subscribed News
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let token = auth.isAuthenticated() && jwt.token;
    setLoading(true);

    listByUser({ userId: jwt.user._id }, { t: token }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Subscribed News could not be uploaded."
        });
      } else {
        setNews(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [jwt.user._id]);

  return (
    <div style={{ margin: "0.5em" }}>
      {matches ? (
        <Grid
          container
          spacing={3}
          sx={{
            p: {
              md: 3,
              lg: 7,
            },
          }}
        >
          <Grid item md={7} lg={8}>
            {loading ? (
              <div>
                <SearchSkeleton />
                {[1, 2, 3, 4, 5].map((n) => (
                  <PostSkelaton key={n} />
                ))}
              </div>
            ) : (
              <Search posts={following} loading={props.loading || loading} />
            )}
          </Grid>
          <Grid item md={5} lg={4}>
            {props.loading || loading ? (
              <Stack spacing={1}>
                <ListSkelaton />
                <ListSkelaton />
                {[1, 2, 3, 4, 5].map((n) => (
                  <PostSkelaton key={n} />
                ))}
                <ListSkelaton />
                <ListSkelaton />
              </Stack>
            ) : (
              <Stack spacing={1}>
                {news && news.length > 0 && (
                  <BestieNews news={news} header="Subscribed News" />
                )}
                {latMatches && latMatches.length > 0 && (
                  <LatestMatches matches={latMatches} header="Latest Matches" />
                )}
                {jwt.user.role === "user" && (
                  <SideList posts={latest} header="Latest From Member Team" />
                )}
                <Bestie values={props.bestTeams} header="Top Teams" />
                {values.polls && values.polls.length > 0 && (
                  <PollsAside polls={values.polls} header="Open Polls" />
                )}
              </Stack>
            )}
          </Grid>
        </Grid>
      ) : (
        <div>
          {loading ? (
            <Stack spacing={2}>
              <ListSkelaton />
              <SearchSkeleton />
              {[1, 2, 3, 4, 5].map((n) => (
                <PostSkelaton key={n} />
              ))}
            </Stack>
          ) : (
            <Stack spacing={1}>
              {latMatches && latMatches.length > 0 && (
                <LatestMatches matches={latMatches} header="Latest Matches" />
              )}
              {news && news.length > 0 && (
                <BestieNews news={news} header="Subscribed News" />
              )}
              <Search posts={following} />
            </Stack>
          )}
        </div>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
}

HomeWorkers.propTypes = {
  bestTeams: PropTypes.array,
};

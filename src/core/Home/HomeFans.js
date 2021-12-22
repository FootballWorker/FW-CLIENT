import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { list } from "./../../post/api-post";
import { listTop } from "./../../news/api-news";
import BestieNews from "../../components/design-news/BestieNews";
import LatestMatches from "../../components/design-aside/LatestMatches";
import Bestie from "../../components/design-aside/Bestie";
import Search from "../../search/Search";
import SnackError from "../../errorHandler/SnackError";
import PlayerSideList from "../../components/design-aside/PlayerSideList";
import ListSkelaton from "../../components/skelatons/ListSkelaton";
import SearchSkeleton from "../../components/skelatons/SearchSkeleton";
import PostSkelaton from "../../components/skelatons/PostSkelaton";

export default function HomeFans(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [values, setValues] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Load Latest Hot Posts
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    list(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Posts could not be uploaded."
        });
      } else {
        setValues(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Top News
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listTop(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. News could not be uploaded."
        });
      } else {
        setNews(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div style={{ margin: "1em" }}>
      {matches ? (
        <Grid
          spacing={3}
          container
          sx={{
            p: {
              md: 1,
              lg: 6,
            },
          }}
        >
          <Grid item md={7}>
            {props.loading || loading ? (
              <div>
                <SearchSkeleton />
                {[1, 2, 3, 4, 5].map((n) => (
                  <PostSkelaton key={n} />
                ))}
              </div>
            ) : (
              <Search posts={values} loading={loading || props.loading} />
            )}
          </Grid>
          <Grid item md={5}>
            {props.loading || loading ? (
              <Stack spacing={1}>
                <ListSkelaton />
                <ListSkelaton />
              </Stack>
            ) : (
              <Stack spacing={1}>
                <Bestie values={props.bestTeams} header="Top Teams" />

                <LatestMatches
                  matches={props.latestMatches}
                  header="Latest Matches"
                />
                <PlayerSideList
                  players={props.bestPlayers}
                  header="Top Players"
                />
                {news && <BestieNews news={news} header="Top News" />}
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
            <Stack spacing={2}>
              <LatestMatches
                matches={props.latestMatches}
                header="Latest Matches"
              />

              <Search posts={values} loading={props.loading || loading} />
            </Stack>
          )}
        </div>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
}

HomeFans.propTypes = {
  bestTeams: PropTypes.array.isRequired,
  latestMatches: PropTypes.array.isRequired,
  bestPlayers: PropTypes.array.isRequired,
};

import React, { useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery, useTheme , Grid, Stack } from '@mui/material'

import { list } from "./../../post/api-post";
import { listTop } from "./../../news/api-news";
import BestieNews from '../../components/design-news/BestieNews';
import LatestMatches from '../../components/design-aside/LatestMatches';
import Bestie from '../../components/design-aside/Bestie';
import Search from '../../search/Search';
import SnackError from "../../errorHandler/SnackError";
import Loading from "../../components/loading/Loading";
import PlayerSideList from '../../components/design-aside/PlayerSideList';




export default function HomeFans(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [values, setValues] = useState([]);
  const [news, setNews] = useState([])
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
          error: data.error,
        });
      } else {
        setValues(data);
	      setLoading(false);
      }
    });

    return () => {
      abortController.abort();
      setLoading(false);
    };
  }, []);

  // Load Top News
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true);

    listTop(signal).then((data)=>{
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      }else{
        setNews(data)
        setLoading(false);
      }
    })

    return () => {
      abortController.abort()
    }
  }, [])

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ margin: "1em" }} > 
      {matches ? (
        <Grid spacing={3} container sx={{ p: {
          md:1,
          lg:6
        } }}>
          <Grid item md={7}>
            <Search posts={values} />
          </Grid>
          <Grid item md={5}>
            <Stack spacing={1}  >
              <Bestie values={props.bestTeams} header="Top Teams" />
              <LatestMatches matches={props.latestMatches} header="Latest Matches" />
              {props.bestPlayers && (
                <PlayerSideList players={props.bestPlayers} header="Top Players" />
              )}
              <BestieNews news={news} header="Top News" />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <div>
          <LatestMatches matches={props.latestMatches} header="Latest Matches" />
          <Search posts={values} />
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
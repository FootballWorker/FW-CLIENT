import React, { useState, useEffect } from "react";

import auth from "../../auth/auth-helper";

import {listByStar} from './../../team/api-team'
import {listPlayerByStar} from './../../player/api-player'
import {listByAudience} from './../../match/api-match'
import HomeFans from "./HomeFans";
import HomeWorkers from "./HomeWorkers";
import SnackError from "../../errorHandler/SnackError";
import Loading from "../../components/loading/Loading";




export default function Home({ history }) {
  const [bestPlayers, setBestPlayers] = useState([])
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [defaultPage, setDefaultPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  // Check Authorization
  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  // Load Best Teams
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listByStar(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setTeams(data)
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Best Players
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listPlayerByStar(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setBestPlayers(data)
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);

  // Load Latest Matches
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    listByAudience(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setMatches(data)
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {!defaultPage && (
        <HomeFans
          bestTeams={teams}
          bestPlayers={bestPlayers}
          latestMatches={matches}
        />
      )}
      {defaultPage && (
        <HomeWorkers
          bestPlayers={bestPlayers}
          bestTeams={teams}
          latestMatches={matches}
        />
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
}

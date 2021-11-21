import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useTheme , useMediaQuery } from '@mui/material'

import auth from "../../auth/auth-helper";
import { list } from "../../department/api-department";

import LandingPC from './LandingPC'
import LandingMobile from './LandingMobile'
import SnackError from "../../errorHandler/SnackError";
import Loading from "../../components/loading/Loading";

const Landing = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const [departments, setDepartments] = useState([]);
  const [redirect, setRedirect] = useState(auth.isAuthenticated());
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });


  // Load Departments
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
        setDepartments(data);
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
  
  if (redirect) {
    return <Redirect to="/home" />;
  }  

  return (
    <div>
      {matches ? (
        <LandingMobile departments={departments} />
        ) : (
        <LandingPC departments={departments} />
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
}

export default Landing

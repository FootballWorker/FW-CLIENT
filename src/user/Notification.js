import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'timeago.js'
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import auth from "./../auth/auth-helper";
import { readNtf } from "./api-user";
import logo from "./../assets/images/orijinalLogo.png";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";

const Notification = ({ match }) => {
  const [ntf, setNtf] = useState({});
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    readNtf(
      { notificationId: match.params.notificationId },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Notifications could not be uploaded."
        });
      } else {
        setNtf(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.notificationId]);

  if (loading) {
    return <Loading text="Notifications Loading..." />;
  }

  return (
    <Paper elevation={0} sx={{p:{xs:1,sm:2,md:3,lg:6}, height: '100%'}}>
      <Card sx={{ maxWidth: "100%", margin: "auto", padding: 5 }}>
        <CardHeader
          avatar={<Avatar src={logo} />}
          title={"From : " + ntf.from}
          subheader={format(ntf.created)}
        />
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            {ntf.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ntf.text}
          </Typography>
          {ntf.link && (
            <Box sx={{ display: "flex", justifyContent: "center", m: 3, p: 2 }}>
              <Link
                to={ntf.link}
                style={{
                  padding: "1em",
                  background: "#FED829",
                  color: "#51545B",
                  borderRadius: "8%",
                }}
              >
                Go to Link
              </Link>
            </Box>
          )}
        </CardContent>
      </Card>
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
};

export default Notification;

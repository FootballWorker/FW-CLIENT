import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import PollIcon from "@mui/icons-material/Poll";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import MilitaryTechTwoToneIcon from "@mui/icons-material/MilitaryTechTwoTone";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import SportsIcon from "@mui/icons-material/Sports";
import AddchartIcon from "@mui/icons-material/Addchart";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import SnackError from "../../../errorHandler/SnackError.js";
import { presidentMail } from "./../../../auth/api-auth";
import kFormatter from "../../numbers.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TransactionTeam(props) {
  const [values, setValues] = useState("");
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  const clickSubmit = () => {
    const content = {
      user: props.user?.name,
      team: props.team?.name,
    };

    presidentMail(content).then((data) => {
      if (data?.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Your request could not be sent.",
        });
      } else {
        setOpen(true);
        setValues(data.message);
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Paper elevation={4}>
      <Stack spacing={1}>
        <Grid container spacing={1} sx={{ m: 1 }}>
          <Grid xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Link to={"/posting/" + props.team._id + "/new"}>
                <Tooltip title="Add Post" >
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Link to={"/matches/by/" + props.team._id}>
                <Tooltip title="See All Matches" >
                  <IconButton>
                    <SportsSoccerIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Grid>
          <Grid xs={4}>
            <Box
              sx={{
                mr:2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap:1
              }}
            >
              {props.stars ? (
                <IconButton color="secondary" onClick={props.clickLike}>
                  <StarIcon />
                </IconButton>
              ) : (
                <IconButton onClick={props.clickLike}>
                  <StarBorderIcon />
                </IconButton>
              )}
              <Typography
                sx={{
                  fontSize: {
                    sm: 12,
                    md: 16,
                  },
                }}
              >
                {kFormatter(props.starLength)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {props.user?.job?.title === "president" &&
            props.user?.favoriteTeam?._id === props.team?._id && (
              <Grid container spacing={1}>
                <Grid xs={6}>
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: 1,
                    }}
                  >
                    <Typography align="center">Become Candidate</Typography>
                    <Divider sx={{ pb: 1 }} />
                    {props.candidate ? (
                      <IconButton onClick={props.clickCandidate}>
                        <MilitaryTechTwoToneIcon
                          color="secondary"
                          sx={{ mr: 0.5, fontSize: 30 }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={props.clickCandidate}>
                        <MilitaryTechOutlinedIcon
                          color="primary"
                          sx={{ mr: 0.5, fontSize: 30 }}
                        />
                      </IconButton>
                    )}
                  </Box>
                </Grid>
                <Grid xs={6}>
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: 1,
                    }}
                  >
                    <Typography align="center">Send Poll Request</Typography>
                    <Divider sx={{ pb: 1 }} />
                    <IconButton onClick={clickSubmit}>
                      <AddchartIcon />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            )}
          {props.user?.department?.name !== "JOURNAL" &&
            props.user?.job?.title === "vice president" &&
            props.user?.favoriteTeam?._id === props.team?._id && (
              <Box
                sx={{
                  p: 1.5,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {props.applicant ? (
                  <IconButton onClick={props.clickApply}>
                    <NoMeetingRoomIcon
                      color="secondary"
                      sx={{ mr: 0.5, fontSize: 30 }}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={props.clickApply}>
                    <MeetingRoomIcon
                      color="primary"
                      sx={{ mr: 0.5, fontSize: 30 }}
                    />
                  </IconButton>
                )}
                <Typography
                  sx={{
                    fontSize: {
                      xs: 12,
                      sm: 14,
                      md: 16,
                    },
                  }}
                >
                  Apply For Job
                </Typography>
              </Box>
            )}
          {props.user?.department?.name !== "JOURNAL" &&
            props.user?.job?.title !== "president" &&
            props.user?.job?.title !== "vice president" && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {props.applicant ? (
                  <IconButton onClick={props.clickApply}>
                    <NoMeetingRoomIcon
                      color="secondary"
                      sx={{ mr: 0.5, fontSize: 30 }}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={props.clickApply}>
                    <MeetingRoomIcon
                      color="primary"
                      sx={{ mr: 0.5, fontSize: 30 }}
                    />
                  </IconButton>
                )}
                <Typography
                  sx={{
                    fontSize: {
                      sm: 12,
                      md: 16,
                    },
                  }}
                >
                  Apply For Job
                </Typography>
              </Box>
            )}
        </Box>
        {props.user?.team && props.user?.job?.title === "vice president" &&
          props.user?.team?._id !== props.team?._id && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 1,
              }}
            >
              <Typography gutterBottom>Proclaim a Match</Typography>
              <Divider sx={{ pb: 1 }} />
              <Link to={"/match/new/" + props.team._id}>
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 800 }}
                  title="Make sure that the match does not already exist!"
                >
                  <SportsIcon />
                </Tooltip>
              </Link>
            </Box>
          )}
        {props.user?.job?.title === "president" &&
          props.user?.team?._id === props.team?._id && props.user?._id === props.team?.president?._id && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 1,
              }}
            >
              <Typography align="center">Add Player</Typography>
              <Divider sx={{ pb: 1 }} />
              <Link to={"/new/player/" + props.team._id}>
                <IconButton>
                  <PersonAddIcon />
                </IconButton>
              </Link>
            </Box>
          )}
        {props.user?.role === "admin" && (
          <Box
            sx={{
              p: 1.5,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Link to={"/new/poll/" + props.team._id}>
                <Tooltip title="Creata Poll">
                  <IconButton>
                    <PollIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Link to={"/edit/team/" + props.team._id}>
                <Tooltip title="Edit Team">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Box>
        )}
      </Stack>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {values}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

TransactionTeam.propTypes = {
  user: PropTypes.object,
  team: PropTypes.object,
  clickLike: PropTypes.func,
  stars: PropTypes.bool.isRequired,
  starLength: PropTypes.number,
  clickApply: PropTypes.func,
  applicant: PropTypes.bool,
  clickCandidate: PropTypes.func,
  candidate: PropTypes.bool,
};

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CommentIcon from "@mui/icons-material/Comment";

import FollowProfileButton from "../../../user/FollowProfileButton";
import TransactionEdit from "../TransactionEdit";
import TransactionAppointmentForAdmin from "./TransactionAppointmentForAdmin";
import TransactionAppointmentForPresident from "./TransactionAppointmentForPresident";
import TransactionAppointmentForManager from "./TransactionAppointmentForManager";
import TransactionAppointmentForEditor from "./TransactionAppointmentForEditor";
import TransactionEditor from "./TransactionEditor";
import DeleteUser from "../../../user/DeleteUser";
import TransactionResignTeam from "./TransactionResignTeam";
import TransactionResignNews from "./TransactionResignNews";
import SendingNtf from "./SendingNtf";
import { Grid } from "@mui/material";
import ChangeTeam from "./ChangeTeam";
import kFormatter from "../../numbers";

export default function TransactionUser(props) {
  return (
    <Paper  sx={{margin:'auto'}} >
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 1,
            pt:1
          }}
        >
          <CommentIcon
            sx={{
              mr: 0.5,
              fontSize: {
                xs: 14,
                md: 19,
              },
            }}
          />
          <Link to={"/comments/by/" + props.user?._id}>
            <Typography
              sx={{
                fontSize: {
                  xs: 14,
                  md: 19,
                },
              }}
            >
              Comments
            </Typography>
          </Link>
        </Box>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Grid container>
            <Grid xs={6}>
              <Typography gutterBottom variant="h6" > Followers </Typography>
              <Link to={"/followers/" + props.user?._id} style={{fontWeight: 'normal'}} >
                {kFormatter(props.followers)}
              </Link>
            </Grid>
            <Grid xs={6}>
              <Typography gutterBottom variant="h6" > Followings </Typography>
              <Link to={"/followings/" + props.user?._id} style={{fontWeight: 'normal'}} >
                {kFormatter(props.followings)}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {props.user?._id === props.staff?._id && (
            <TransactionEdit link={"/users/edit/" + props.user._id} />
          )}
          {props.user?._id === props.staff?._id && !props.user.favoriteTeam && (
            <ChangeTeam user={props.user} />
          )}
          {props.user &&
            !props.user.team &&
            !props.user.news &&
            props.staff &&
            props.user._id === props.staff._id && (
              <DeleteUser userId={props.user._id} />
            )}
        </Box>
        {props.user?._id !== props.staff?._id && (
          <FollowProfileButton
            user={props.user}
            following={props.following}
            followings={props.followings}
            followers={props.followers}
            onButtonClick={props.followButton}
          />
        )}
        {props.user?._id === props.staff?._id &&
          !props.user?.news &&
          props.user?.job &&
          props.user?.job?.title === "editor" && <TransactionEditor />}
        <Box
          sx={{
            margin: "auto",
          }}
        >
          {props.staff?.role === "admin" && (
            <SendingNtf user={props.user} admin={props.staff} />
          )}
          {props.staff?.role === "admin" && (
            <TransactionAppointmentForAdmin
              user={props.user}
              admin={props.staff}
              presidentButton={props.presidentButton}
              editorButton={props.editorButton}
            />
          )}
          {props.user?._id === props.staff?._id && props.user.team && (
            <TransactionResignTeam
              user={props.user}
              firingTeam={props.firingTeam}
            />
          )}
          {props.user?._id === props.staff?._id && props.user.news && (
            <TransactionResignNews
              user={props.user}
              employeeButton={props.employeeButton}
            />
          )}
          {props.staff?.team?.name !== "" &&
            props.staff?.job?.title === "president" && (
              <TransactionAppointmentForPresident
                user={props.user}
                president={props.staff}
                firingTeam={props.firingTeam}
              />
            )}
          {props.staff?.team?.name !== "" &&
            props.staff?.job?.title === "manager" && (
              <TransactionAppointmentForManager
                user={props.user}
                manager={props.staff}
                firingTeam={props.firingTeam}
              />
            )}
          {props.user?.department?.name === "JOURNAL" &&
            props.user?.job?.title !== "editor" &&
            props.staff?.job?.title === "editor" && (
              <TransactionAppointmentForEditor
                user={props.user}
                editor={props.staff}
                employeeButton={props.employeeButton}
              />
            )}
        </Box>
      </Stack>
    </Paper>
  );
}

TransactionUser.propTypes = {
  staff: PropTypes.object,
  user: PropTypes.object,
  followButton: PropTypes.func,
  following: PropTypes.bool,
  followers: PropTypes.number,
  followings: PropTypes.number,
  presidentButton: PropTypes.func,
  firingTeam: PropTypes.func,
  editorButton: PropTypes.func,
  employeeButton: PropTypes.func,
};

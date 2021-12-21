import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import AddIcon from "@mui/icons-material/Add";

import TransactionEdit from '../TransactionEdit'
import kFormatter from '../../numbers';

export default function TransactionNews(props) {
  return (
    <Paper elevation={4}>
      <Stack spacing={1}>
        {props.news &&
          props.news.editor &&
          props.user &&
          (props.news.editor._id === props.user._id || props.employee) && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 1,
              }}
            >
              <Typography>Add Post </Typography>
              <Divider variant="middle" />
              <Link to={"/post/new/" + props.news._id}>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Link>
            </Box>
          )}
        {props.news &&
          props.news.editor &&
          props.user &&
          props.news.editor._id === props.user._id && (
            <TransactionEdit link={"/news/edit/" + props.news._id} />
          )}
        
        {
          !props.news.editor &&
          !props.user.news &&
          props.user?.job?.title === 'editor' &&
          props.user?.department?.name === "JOURNAL" && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                m: 1,
                p: 1.5,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: {
                    xs: 14,
                    sm: 17,
                    md: 21,
                  },
                  fontWeight: 500,
                }}
              >
                Apply For Job
              </Typography>
              <Divider sx={{ pb: 2 }} />
              {props.applied ? (
                <IconButton onClick={props.applyClick}>
                  <NoMeetingRoomIcon
                    color="secondary"
                    sx={{ mr: 0.5, fontSize: 30 }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={props.applyClick}>
                  <MeetingRoomIcon
                    color="primary"
                    sx={{ mr: 0.5, fontSize: 30 }}
                  />
                </IconButton>
              )}
            </Box>
          )}
        {
          !props.user.news &&
          props.user.job &&
          props.user.job.title !== 'editor' &&
          props.user.department &&
          props.user.department.name === "JOURNAL" && (
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                m: 1,
                p: 1.5,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: {
                    xs: 14,
                    sm: 17,
                    md: 21,
                  },
                  fontWeight: 500,
                }}
              >
                Apply For Job
              </Typography>
              <Divider sx={{ pb: 2 }} />
              {props.applied ? (
                <IconButton onClick={props.applyClick}>
                  <NoMeetingRoomIcon
                    color="secondary"
                    sx={{ mr: 0.5, fontSize: 30 }}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={props.applyClick}>
                  <MeetingRoomIcon
                    color="primary"
                    sx={{ mr: 0.5, fontSize: 30 }}
                  />
                </IconButton>
              )}
            </Box>
          )}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            m: 1,
            p: 1,
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontSize: {
                xs: 14,
                sm: 17,
                md: 21,
              },
              fontWeight: 500,
            }}
          >
            Subscribe
          </Typography>
          <Divider sx={{ pb: 2 }} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              m: 1,
              p: 1,
            }}
          >
            {props.subscribe ? (
              <IconButton color="secondary" onClick={props.subscribeClick}>
                <BookmarkIcon />
              </IconButton>
            ) : (
              <IconButton color="primary" onClick={props.subscribeClick}>
                <BookmarkBorderIcon />
              </IconButton>
            )}
            <Typography
              sx={{
                fontSize: {
                  xs: 9,
                  sm: 13,
                  md: 17,
                },
              }}
            >
              {kFormatter(props.subs)}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
}

TransactionNews.propTypes = {
  user: PropTypes.object,
  news: PropTypes.object,
  subscribeClick : PropTypes.func,
  subscribe : PropTypes.bool,
  employee : PropTypes.bool,
  applied : PropTypes.bool,
  applyClick: PropTypes.func,
  subs: PropTypes.number
  
};
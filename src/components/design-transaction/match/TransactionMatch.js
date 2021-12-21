import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import {Box,Typography,Divider,IconButton, Paper, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';

import TransactionEdit from "../TransactionEdit";

export default function TransactionMatch (props) {
  const presentDate  = (new Date()).toTimeString()
  const matchDate  = (new Date(props.match.date)).toTimeString()
  const checkDate = matchDate > presentDate 
  return (
    <Paper elevation={4}>
      <Stack spacing={1}>
	      <Typography align="center" variant="h5" sx={{p:2 , fontWeight:'bold' }} >Transactions </Typography>
        {props.audience && (
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
            <Link to={"/newpost/" + props.match._id}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Link>
          </Box>
        )}
        {
          checkDate ? (
            <>
              { props.capacity && (
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 1,
                }}
              >
                <Typography>Book A Seat</Typography>
                <Divider />
                {props.audience ? (
                  <IconButton
                    onClick={props.clickAudience}
                    aria-label="Audience"
                    color="secondary"
                  >
                    <EventSeatRoundedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={props.clickAudience}
                    aria-label="Disaudience"
                    color="primary"
                  >
                    <EventSeatOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            )}
            </>
          ) : (
            <Typography align="center" sx={{fontWeight:500}} >Cannot be audience after the match!</Typography>
          )
        }
        
        {
          props.match &&
          props.match.createdBy &&
          props.user._id === props.match.createdBy._id && (
            <TransactionEdit link={"/match/edit/" + props.match._id} />
          )}
      </Stack>
    </Paper>
  );
};

TransactionMatch.propTypes = {
  match: PropTypes.object,
  home: PropTypes.object,
  user: PropTypes.object,
  clickAudience: PropTypes.func,
  audience: PropTypes.bool,
  audiences: PropTypes.number,
  capacity: PropTypes.bool,
};

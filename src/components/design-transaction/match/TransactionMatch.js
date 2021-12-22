import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';
import EventSeatOutlinedIcon from '@mui/icons-material/EventSeatOutlined';

import TransactionEdit from "../TransactionEdit";
import ListHeader from "../../header/ListHeader";


export default function TransactionMatch (props) {
  const presentDate  = (new Date()).toTimeString()
  const matchDate  = (new Date(props.match.date)).toTimeString()
  const checkDate = matchDate > presentDate 
  return (
    <Paper elevation={4}>
      <Stack spacing={1}>
      <ListHeader header="Transactions" />
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

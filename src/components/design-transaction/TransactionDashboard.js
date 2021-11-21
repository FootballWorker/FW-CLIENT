import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, IconButton, Tooltip } from '@mui/material'

import GroupsIcon from "@mui/icons-material/Groups";
import BusinessSharpIcon from "@mui/icons-material/BusinessSharp";
import DirectionsRunSharpIcon from "@mui/icons-material/DirectionsRunSharp";

export default function TransactionDashboard() {
  return (
    <div>
      <Grid container spacing={1} >
        <Grid item xs={4} sx={{justifyContent:'center',textAlign:'center'}} >
          <Tooltip title="Create Department">
            <Link to="/department/new">
              <IconButton>
                <BusinessSharpIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid item xs={4} sx={{justifyContent:'center',textAlign:'center'}}>
          <Tooltip title="Create Team">
            <Link to="/new/team">
              <IconButton>
                <GroupsIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
        <Grid item xs={4} sx={{justifyContent:'center',textAlign:'center'}} >
          <Tooltip title="Create Position">
            <Link to="/new/position">
              <IconButton>
                <DirectionsRunSharpIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}

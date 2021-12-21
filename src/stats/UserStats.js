import React from 'react'
import { Grid } from '@mui/material'

import StatBox from './StatBox'

export default function UserStats(props) {
  return (
    <Grid container sx={{mt:{xs:7,md:13}}} > 
      <Grid xs={6}> <StatBox dataName="post" data={props.postLike}  /> </Grid>
      <Grid xs={6} > <StatBox dataName="comment" data={props.commentLike}  /> </Grid>
    </Grid>
  )
}

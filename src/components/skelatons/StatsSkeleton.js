import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const StatsSkeleton = () => {
  return (
    <Grid container spacing={1} sx={{pr:3,pl:3,mt:1}} >
      <Grid item xs={6} > <Skeleton height={200} sx={{borderRadius:'10px'}} /> </Grid>
      <Grid item xs={6}> <Skeleton height={200} sx={{borderRadius:'10px'}} /> </Grid>
    </Grid>
  )
}

export default StatsSkeleton

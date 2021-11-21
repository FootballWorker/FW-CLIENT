import React from 'react'
import { Grid,Divider, useMediaQuery, useTheme ,Stack} from '@mui/material'

import Departments from '../department/Departments'
import Jobs from '../job/Jobs'
import Positions from '../position/Positions'
import Teams from '../team/Teams'
import PageHeader from '../components/header/PageHeader'
import TransactionDashboard from '../components/design-transaction/TransactionDashboard'

const Dashboard = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div>
      <PageHeader header="Dashboard" />
      <Divider />
      <TransactionDashboard />
      {matches ? (
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item md={4}>
            <Stack spacing={1}>
              <Departments />
              <Jobs />
              <Positions />
            </Stack>
          </Grid>
          <Grid item md={8}>
            <Stack spacing={1}>
              <Teams />
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Departments />
          <Jobs />
          <Positions />
          <Teams />
        </div>
      )}
    </div>
  );
}

export default Dashboard

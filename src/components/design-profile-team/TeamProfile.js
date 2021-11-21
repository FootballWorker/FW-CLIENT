import React from 'react'
import PropTypes from 'prop-types'
import {Box, Divider, Grid, Typography } from "@mui/material";
import HomeMaxIcon from "@mui/icons-material/HomeMax";
import PublicIcon from "@mui/icons-material/Public";
import StarIcon from "@mui/icons-material/Star";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import kFormatter from '../numbers';

export default function TeamProfile(props) {
  return (
    <Box
      sx={{
        mt: 2,
        padding: 1.5,
        maxWidth: "100%",
        height: "100%",
        bgcolor: `${props.team.firstColor}`,
        color: `${props.team.secondColor}`,
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: `${props.team.secondColor}`,
          color: `${props.team.firstColor}`,
          opacity: [0.9, 0.8, 0.8],
        },
      }}
    >
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: {
            xs: 22,
            sm: 30,
            md: 45,
          },
          fontFamily: "Andada Pro",
          fontWeight: "bold",
        }}
      >
        {props.team && props.team.name}
      </Typography>
      <Divider variant="middle" />
      <Grid
        container
        sx={{
          mt: 2,
          pb: 1,
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomeMaxIcon />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 14,
                md: 19,
              },
            }}
          >
            {props.team &&
              props.team.stadium + "(" + props.team.stadiumCapacity + ")"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PublicIcon />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 14,
                md: 19,
              },
            }}
          >
            {props.team && props.team.country}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMembershipIcon />
          <Typography
            sx={{
              fontSize: {
                xs: 9,
                sm: 14,
                md: 19,
              },
            }}
          >
            {kFormatter(props.team?.members?.length)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}


TeamProfile.propTypes = {
  team: PropTypes.object.isRequired
}
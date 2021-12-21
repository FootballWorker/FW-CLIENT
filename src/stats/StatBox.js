import React from "react";

import Box from "@mui/material/Box";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import Typography from "@mui/material/Typography";

export default function StatBox(props) {
  return (
    <Box
      sx={{
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        m: {xs:1,sm:2,md:3,lg:4},
        p: 1,
        pt:2,
        background: "#34495E",
        color: "#FED829",
        borderRadius: "1em",
        height: { xs: 90, sm: 110, md: 100, lg: 100 },
      }}
    >
      <Typography sx={{ fontSize: { xs: 11, sm: 13, md: 15, lg: 21 } }} gutterBottom >
        {props.dataName === "post"
          ? "Total Likes Posts"
          : props.dataName === "comment"
          ? "Total Likes Comments"
          : "follow"
          ? "Total Followers Workers"
          : ""}
      </Typography>
      <>
        {props.dataName === "post" ? (
          <FavoriteIcon color="secondary" />
        ) : props.dataName === "comment" ? (
          <ThumbUpIcon color="secondary" />
        ) : props.dataName === "follow" ? (
          <PeopleIcon color="secondary" />
        ) : (
          ""
        )}
      </>
      <Typography> {props.data ? props.data : 0} </Typography>
    </Box>
  );
}

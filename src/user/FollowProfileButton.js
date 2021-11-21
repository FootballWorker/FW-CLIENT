import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { unfollow, follow } from "./api-user.js";

export default function FollowProfileButton(props) {
  const followClick = () => {
    props.onButtonClick(follow);
  };
  const unfollowClick = () => {
    props.onButtonClick(unfollow);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {props.following ? (
        <Button variant="contained" color="secondary" onClick={unfollowClick}>
          Unfollow
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={followClick}>
          Follow
        </Button>
      )}
    </Box>
  );
}

FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

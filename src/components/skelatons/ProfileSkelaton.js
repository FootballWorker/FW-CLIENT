import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ProfileSkelaton() {
  return (
    <Stack spacing={1} sx={{ p: 1, maxWidth: "100%",border:'2px' , borderRadius:'10px',borderColor:'GrayText' }}>
      <Skeleton variant="rectangular" height={200} sx={{width:'100%'}} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Stack>
  );
}

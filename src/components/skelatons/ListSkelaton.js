import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function ListSkelaton() {
  return (
    <Stack spacing={1} sx={{ p: 1, maxWidth: "100%" }}>
      <Skeleton variant="text" sx={{margin:'auto',width:150}} />
      <Skeleton variant="text" height={55} />
      <Skeleton variant="text" height={55} />
      <Skeleton variant="text" height={55} />
    </Stack>
  );
}

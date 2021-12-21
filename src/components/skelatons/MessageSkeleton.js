import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function MessageSkeleton() {
  return (
    <Stack spacing={1} sx={{ p: 1, maxWidth: "100%"}}>
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={120} />
    </Stack>
  );
}

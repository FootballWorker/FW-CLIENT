import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function MatchSkeleton() {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        maxWidth: '100%',
        border: "2px solid",
        borderColor: "whitesmoke",
        borderRadius: "10px",
        justifyContent:'center',
        margin:'auto',
      }}
    >
      <Box sx={{display:'flex',justifyContent:'space-between' }}>
        <Skeleton variant="text" width={75} height={25} />
        <Skeleton variant="text" width={75} height={25} />
        <Skeleton variant="text" width={75} height={25} />
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-between' }}>
        <Skeleton variant="text" width={75} height={25} />
        <Skeleton variant="text" width={75} height={25} />
        <Skeleton variant="text" width={75} height={25} />
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-evenly',margin:'auto' }}>
        <Skeleton variant="text" width={75} height={25} />
        <Skeleton variant="text" width={75} height={25} />
      </Box>
    </Stack>
  );
}

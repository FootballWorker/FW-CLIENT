import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function TeamProfileSkeleton() {
  return (
    <Stack
      sx={{
        pr: {xs:1,sm:2,md:4,lg:6},
        pl: {xs:1,sm:2,md:4,lg:6},
        maxWidth: '100%',
        border: "2px solid",
        borderColor: "whitesmoke",
        borderRadius: "10px",
      }}
    >
      <Skeleton sx={{margin:'auto'}} variant="text" width={150} height={50} />
      <Box sx={{display:'flex',gap:2,justifyContent:'space-between',p:2 }}>
        <Skeleton variant="text" width={75} height={30} />
        <Skeleton variant="text" width={75} height={30} />
        <Skeleton variant="text" width={75} height={30} />
      </Box>
      <Box sx={{display:'flex',justifyContent:'space-evenly',p:2 }}>
        <Skeleton variant="text" width={75} height={30} />
        <Skeleton variant="text" width={75} height={30} />
      </Box>
    </Stack>
  );
}

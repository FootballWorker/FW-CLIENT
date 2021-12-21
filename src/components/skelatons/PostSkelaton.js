import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function PostSkelaton() {
  return (
    <Stack
      spacing={1}
      sx={{
        margin:'auto',
        mb: 1,
        maxWidth:700,
        border: "2px solid",
        borderColor: "whitesmoke",
        borderRadius: "10px",
      }}
    >
      <Box sx={{ml:{xs:2,md:5},display:'flex',gap:2 }}>
        <Skeleton variant="circular" width={25} height={25} />
        <Skeleton variant="text" width={150} height={25} />
      </Box>
      <Grid container spacing={1} sx={{ p: 3 }}>
        <Grid xs={4}>
          <Skeleton variant="rectangular" sx={{ mr: 1 }} height={100} />
        </Grid>
        <Grid xs={8}>
          <Skeleton variant="text" height={25} />
          <Skeleton variant="text" height={25} />
          <Skeleton variant="text" height={25} />
          <Skeleton variant="text" height={25} />
        </Grid>
      </Grid>
    </Stack>
  );
}

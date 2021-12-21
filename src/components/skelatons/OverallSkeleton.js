import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

export default function OverallSkeleton() {
  return (
    <Stack
      spacing={1}
      sx={{
        mb: 3,
        p: 1,
        maxWidth: "100%",
        border: "2px solid",
        borderColor: "whitesmoke",
        borderRadius: "10px",
      }}
    >
      <Grid container sx={{ p: 3,textAlign:'center',justifyContent:'center',alignItems:'center',margin:'auto' }}>
        <Grid xs={12} md={7} sx={{textAlign:'center',justifyContent:'center',alignItems:'center',margin:'auto' }} >
          <Skeleton variant="circular" sx={{ margin: 'auto',width:{xs:250,md:350} }}  height={300} />
        </Grid>
        <Grid xs={12} md={5}>
          <Skeleton variant="text" height={300} />
        </Grid>
      </Grid>
    </Stack>
  );
}

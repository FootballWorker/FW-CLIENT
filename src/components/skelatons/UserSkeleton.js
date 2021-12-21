import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Grid } from "@mui/material";
import StatsSkeleton from "./StatsSkeleton";
// import SideSkeleton from "./SideSkeleton";

export default function UserSkeleton() {
  return (
    <Grid
      container
      spacing={1}
      sx={{ pr: { xs: 1, md: 4, lg: 10 }, pl: { xs: 1, md: 4, lg: 10 } }}
    >
      <Grid item xs={12} md={8}>
        <Skeleton variant="rectangular" height={150} />
        <StatsSkeleton />
      </Grid>
      <Grid item xs={12} md={4} sx={{mt:{xs:2,md:0}}} >
        <Skeleton variant="rectangular" height={400} />
      </Grid>
    </Grid>
  );
}

import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from '@mui/material/Box';


export default function DepSkeleton() {
  return (
    <Box sx={{ p:5 ,display: "grid", gridTemplateColumns: {xs:"repeat(1, 1fr)"  ,md: "repeat(3, 1fr)"},gap:5 }}>
      <Skeleton variant="rectangular" sx={{height: {xs:110,md:300}}} />
      <Skeleton variant="rectangular" sx={{height: {xs:110,md:300}}} />
      <Skeleton variant="rectangular" sx={{height: {xs:110,md:300}}} />
    </Box>
  );
}

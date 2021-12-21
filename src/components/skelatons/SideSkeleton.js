import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function SideSkeleton() {
  return <Skeleton variant="rectangular" height={300} sx={{ margin: "auto", width: '100%' }} />;
}

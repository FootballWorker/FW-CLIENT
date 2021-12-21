import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function StaffSkeleton() {
  return (
    <Stack
      spacing={1}
      sx={{
        padding: 1,
        maxWidth: "100%",
        border: "2px solid",
        borderColor: "whitesmoke",
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}}  />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
        <Box
          sx={{
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            mb: 2,
          }}
        >
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 1,
        }}
      >
        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
        <Box sx={{ margin: "auto", display: "flex", flexDirection: "column" }}>
          <Skeleton variant="text" width={25} height={15} sx={{margin:'auto'}} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
          <Skeleton variant="text" width={100} height={15} />
        </Box>
      </Box>
    </Stack>
  );
}

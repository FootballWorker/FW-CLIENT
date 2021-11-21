import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Logo from './../../assets/images/orijinalLogo.png'

export default function Loading() {
  return (
    <Stack
      spacing={1}
      sx={{
        maxWidth: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#51545B",
      }}
    >
      <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              maxWidth: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          />
        </Box>
      <Typography align="center" sx={{ color: "#FED829", fontSize: 30, fontWeight: "bold" }}>
        Loading...
      </Typography>
      <CircularProgress color="warning" sx={{ fontSize: 50 }} />
    </Stack>
  );
}

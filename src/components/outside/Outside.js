import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WebSiteLink from "../design-button/WebSiteLink";

export default function Outside() {
  return (
    <Stack
      spacing={4}
      sx={{
        maxWidth: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#51545B",
      }}
    >
      <Box>

      </Box>
      <Typography align="center" sx={{ color: "#FED829", fontSize: {xs: 22, sm:35,md:40}, fontWeight: "bold" }}>
        Hey , You Are Off the Stadium !
      </Typography>
      <WebSiteLink link="/home" text="Back to the Field!" />
    </Stack>
  );
}

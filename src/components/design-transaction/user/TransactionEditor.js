import React from 'react'
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FoundationIcon from "@mui/icons-material/Foundation";

export default function TransactionEditor() {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 1,
      }}
    >
      <Typography>Create A Newspaper</Typography>
      <Divider variant="middle" sx={{pb:1}} />
      <Link to="/new/news">
        <IconButton>
          <FoundationIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

import React from "react";
import {Link} from 'react-router-dom'
import {
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const TransactionEdit = (props) => {

  return (
    <Box
      sx={{
        diplay:'flex',
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Link to={props.link}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default TransactionEdit;

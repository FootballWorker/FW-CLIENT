import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

export default function TransactionDepartment(props) {

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Typography
        align="center"
        sx={{
          p: 1,
        }}
      >
        Transactions
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mb: 3,
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          textAlign: "center",
        }}
      >
        <Box>
          <Link to={"/job/new/" + props.department._id}>
            <Tooltip title="Add Job">
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box>
          <Link to={"/department/edit/" + props.department._id}>
            <Tooltip title="Edit Department">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}

TransactionDepartment.propTypes = {
  department : PropTypes.object.isRequired
}

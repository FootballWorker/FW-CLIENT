import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import auth from "./../auth/auth-helper";
import { list } from "./api-department";
import SnackError from "../errorHandler/SnackError";
import DeleteDepartment from "./DeleteDepartment";
import ListHeader from "../components/header/ListHeader";
import ListSkelaton from "../components/skelatons/ListSkelaton";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;
    setLoading(true);

    list(signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setDepartments(data);
        setLoading(false);
      }
    });

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  // Remove Department by Editing
  const removeDepartment = (departmnet) => {
    const updatedDepartments = [...departments];
    const index = updatedDepartments.indexOf(departmnet);
    updatedDepartments.splice(index, 1);
    setDepartments(updatedDepartments);
  };

  return (
    <Paper elevation={4}>
      <ListHeader header="Departments" />
      {loading ? (
        <ListSkelaton />
      ) : (
        <List dense>
          {departments.map((item, i) => {
            return (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    <Link to={"/departments/" + item._id}>
                      <Typography> {item.name} </Typography>
                    </Link>
                  }
                />
                <ListItemSecondaryAction>
                  {auth.isAuthenticated().user.role === "admin" && (
                    <DeleteDepartment
                      department={item}
                      onRemove={removeDepartment}
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

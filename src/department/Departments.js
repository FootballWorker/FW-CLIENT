import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import auth from "./../auth/auth-helper";
import { list } from "./api-department";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";
import DeleteDepartment from "./DeleteDepartment";
import ListHeader from "../components/header/ListHeader";
import { Link } from "react-router-dom";

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

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={8}>
      <ListHeader header="Departments" />
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
      <SnackError open={isError.openSnack} text={isError.error} />
    </Paper>
  );
}

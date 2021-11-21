import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import auth from './../auth/auth-helper'
import { listPositions } from "./api-position";
import DeletePosition from "./DeletePosition";
import SnackError from "../errorHandler/SnackError";
import Loading from "../components/loading/Loading";
import ListHeader from "../components/header/ListHeader";




export default function Positions(props) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });

  useEffect(() => {
    const abortConroller = new AbortController();
    const signal = abortConroller.signal;
    setLoading(true);

    listPositions( signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setPositions(data);
          setLoading(false);

        }
      }
    );

    return function cleanup() {
      abortConroller.abort();
    };
  }, []);

  const removePosition = (position) => {
    const updatedPositions = [...positions]
    const index = updatedPositions.indexOf(position)
    updatedPositions.splice(index,1)
    setPositions(updatedPositions)
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Paper elevation={4}>
      <ListHeader header="Positions" />
      <Divider />
      <List dense>
        {positions &&
          positions.map((item, i) => {
            return (
              <ListItem key={i} button>
                <ListItemText primary={item.title} />
                <ListItemSecondaryAction>
                  {auth.isAuthenticated().user.role === "admin" && (
                    <>
                      <IconButton aria-label="Edit" color="secondary">
                        <Link to={"/position/edit/" + item._id}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                      {auth.isAuthenticated().user.role === "admin" && (
                        <DeletePosition
                          position={item}
                          onRemove={removePosition}
                        />
                      )}
                    </>
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

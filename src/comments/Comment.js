import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../auth/auth-helper";
import { read, listRelated, like, unlike } from "./api-comment";
import SideComments from "../components/design-aside/SideComments";
import SingleComment from "../components/design-post/SingleComment";
import SnackError from "../errorHandler/SnackError.js";
import PostSkelaton from "../components/skelatons/PostSkelaton";
import SideSkeleton from "../components/skelatons/SideSkeleton";
import NotFound from "../components/outside/NotFound";

const Comment = ({ match }) => {
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({});
  const [related, setRelated] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated();

  // Load Comment Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ commentId: match.params.commentId }, signal).then((data) => {
      if (data?.error === "Comment not found") {
        setRedirect(true);
      } else if (data && data.error) {
        setIsError({
          ...isError,
          open: true,
          error: "500 Server Error! Comment could not be loaded.",
        });
      } else {
        setComment(data);
        let like = checkLike(data);
        setValues({
          ...values,
          like: like,
          likes: data.likes.length,
        });
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.commentId]);

  const checkLike = (comment) => {
    const match =
      comment &&
      comment.likes.some((user) => {
        return user._id === jwt.user._id;
      });
    return match;
  };
  
  const [values, setValues] = useState({
    like: false,
    likes: 0,
  });

  // Load Related Comments Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRelated(
      { commentId: match.params.commentId },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Related Comments could not be loaded.",
        });
      } else {
        setRelated(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.commentId]);

  // Like Functionality
  const clickLike = () => {
    setOpen(true);
    let callApi = values.like ? unlike : like;
    callApi({ userId: jwt.user._id }, { t: jwt.token }, comment._id).then(
      (data) => {
        if (data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: "500 Server Error! Like function could not work.",
          });
          setOpen(false);
        } else {
          setValues({
            ...values,
            like: !values.like,
            likes: data.likes.length,
          });
          setOpen(false);
        }
      }
    );
  };

  if (redirect) {
    return <NotFound text="the Comment" />;
  }

  return (
    <div>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={related ? 8 : 12}>
          {loading ? (
            <SideSkeleton />
          ) : (
            <SingleComment
              comment={comment}
              like={values.like}
              likes={values.likes}
              clickLike={clickLike}
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {loading ? (
            [1, 2, 3, 4].map((n) => <PostSkelaton key={n} />)
          ) : (
            <SideComments comments={related} />
          )}
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Comment;

import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from './../auth/auth-helper'
import {read,listRelated,like,unlike} from './api-comment'
import SideComments from '../components/design-aside/SideComments'
import SingleComment from '../components/design-post/SingleComment'
import SnackError from "../errorHandler/SnackError.js";
import Loading from "../components/loading/Loading";




const Comment = ({match}) => {
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });  
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({})
  const [related, setRelated] = useState([])
  const [open, setOpen] = useState(false);
  const jwt = auth.isAuthenticated()

  // Load Comment Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController()
    const signal = abortController.signal

    read(
      {commentId: match.params.commentId},
      signal
    ).then((data)=>{
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      }else {
        setComment(data)
        let like = checkLike(data);
        setValues({
          ...values,
          like: like,
          likes: data.likes.length,
        });
        setLoading(false);
      }
    })

    return () => {
      abortController.abort()
    }
  }, [match.params.commentId])

  const checkLike = (comment) => {
    const match = comment &&  comment.likes.some((user) => {
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
          error: data.error,
        });
      } else {
        setRelated(data);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort()
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
            error: data.error,
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
  }

  if (loading) {
    return <Loading />;
  }


  return (
    <div>
      <Grid container spacing={2} sx={{p:2}} >
        <Grid item xs={12} md={ related ? 8 : 12 }>
          <SingleComment
            comment={comment}
            like={values.like}
            likes={values.likes}
            clickLike={clickLike}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SideComments comments={related} header="Related Comments" />
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
}

export default Comment

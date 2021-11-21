import React, { useEffect, useState } from 'react'
import { useMediaQuery, useTheme , Grid ,Box , Typography, Stack } from '@mui/material'
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from './../../auth/auth-helper'
import { read, listRelated, like, unlike, pin, unpin } from "./../api-post";
import {list} from './../../comments/api-comment'
import SinglePost from '../../components/design-post/SinglePost'
import WebSiteLink from '../../components/design-button/WebSiteLink'
import SnackError from './../../errorHandler/SnackError'
import Comments from '../../comments/Comments'
import SideList from '../../components/design-aside/SideList'
import Loading from "../../components/loading/Loading";

const Post = ({match}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [post,setPost] = useState({}) 
  const [comments, setComments] = useState([])
  const [values, setValues] = useState({
    related: [],
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load Post Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ postId: match.params.postId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setPost(data)
        let like = checkLike(data);
        setLikeState({
          ...likeState,
          like: like,
          likes: data.likes.length,
        });
        setIsPinned(data.pinned)
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.postId]);

  // Like Values
  const checkLike = (post) => {
    const match = post && jwt.user && post.likes.some((user) => {
      return user._id == jwt.user._id;
    });
    return match;
  };
  const [likeState, setLikeState] = useState({
    like: false,
    likes: 0,
  });

  const [isPinned, setIsPinned] = useState(false);

  // Load Related Posts Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRelated({ postId: match.params.postId }, signal).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setValues({ ...values, related: data });
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.postId]);

  // Load Comments Data
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;

    list({ postId: match.params.postId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
        } else {
          setComments(data)
          setLoading(false);
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.postId]);


  // ---------------------- FUNCTIONS ---------------------

  // Remove Comment by Editing
  const removeComment = (comment) => {
    const updatedComments = [...comments];
    const index = updatedComments.indexOf(comment);
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const clickLike = () => {
    setProgress(true);
    let callApi = likeState.like ? unlike : like;

    callApi({ userId: jwt.user._id }, { t: jwt.token }, match.params.postId).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: data.error,
        });
      } else {
        setLikeState({ ...likeState, like: !likeState.like, likes: data.likes.length });
        setProgress(false);
      }
    });
  };

  const clickPin = () => {
    setProgress(true);
    let callApi = isPinned ? unpin : pin;

    callApi( {postId: match.params.postId}, { t: jwt.token } ).then(
      (data) => {
        if (data && data.error) {
          setIsError({
            ...isError,
            openSnack: true,
            error: data.error,
          });
          setProgress(false)
        } else {
          setIsPinned(data.pinned);
          setProgress(false);
        }
      }
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {matches ? (
        <Grid container spacing={3} sx={{ p: {xs:1,sm:2,md:3,lg:8} }}>
          <Grid item md={7}>
            <Stack spacing={1} >
              <SinglePost
                post={post}
                comments={comments && comments.length}
                isLiked={likeState.like}
                likes={likeState.likes}
                isPinned={isPinned}
                clickLike={clickLike}
                clickPin={clickPin}
              />
              {auth.isAuthenticated() ? (
                <Comments comments={comments} removeComment={removeComment} header="Comments"  />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Typography align="center">
                    To see the commments section , you must be Football Worker !
                  </Typography>
                  <WebSiteLink text="Be Worker" link="/" />
                </Box>
              )}
            </Stack>
          </Grid>
          <Grid item md={5}>
            <SideList posts={values.related} header="Related Posts" />
          </Grid>
        </Grid>
      ) : (
        <Stack spacing={1} >
          <SinglePost
            post={post}
            comments={comments && comments.length}
            isLiked={likeState.like}
            likes={likeState.likes}
            isPinned={isPinned}
            clickLike={clickLike}
            clickPin={clickPin}
          />
          {auth.isAuthenticated() ? (
            <Comments comments={comments} removeComment={removeComment} header="Comments" />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography align="center">
                To see the commments section , you must be Football Worker !
              </Typography>
              <WebSiteLink text="Be Worker" link="/" />
            </Box>
          )}
        </Stack>
      )}
      <SnackError open={isError.openSnack} text={isError.error} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={progress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Post

import React, { useEffect, useState } from "react";
import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import auth from "./../../auth/auth-helper";
import { read, listRelated, like, unlike, pin, unpin } from "./../api-post";
import { list } from "./../../comments/api-comment";
import SinglePost from "../../components/design-post/SinglePost";
import WebSiteLink from "../../components/design-button/WebSiteLink";
import SnackError from "./../../errorHandler/SnackError";
import Comments from "../../comments/Comments";
import SideList from "../../components/design-aside/SideList";
import PostSkelaton from "../../components/skelatons/PostSkelaton";
import SideSkeleton from "../../components/skelatons/SideSkeleton";
import NotFound from "../../components/outside/NotFound";

const Post = ({ match }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [values, setValues] = useState({
    related: [],
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);
  const [redirect, setRedirect] = useState(false);
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
      if (data?.error === "Post not found") {
        setRedirect(true);
      } else if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Post could not be uploaded."
        });
      } else {
        setPost(data);
        let like = checkLike(data);
        setLikeState({
          ...likeState,
          like: like,
          likes: data.likes.length,
        });
        setIsPinned(data.pinned);
        setLoading(false);
      }
    });

    return () => {
      abortController.abort();
    };
  }, [match.params.postId]);

  // Like Values
  const checkLike = (post) => {
    const match =
      post &&
      jwt.user &&
      post.likes.some((user) => {
        return user._id === jwt.user._id;
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
          error: "500 Server Error. Related posts could not be uploaded."
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
            error: "500 Server Error. Commments could not be uploaded."
          });
        } else {
          setComments(data);
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

    callApi(
      { userId: jwt.user._id },
      { t: jwt.token },
      match.params.postId
    ).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Like function could not work."
        });
      } else {
        setLikeState({
          ...likeState,
          like: !likeState.like,
          likes: data.likes.length,
        });
        setProgress(false);
      }
    });
  };

  const clickPin = () => {
    setProgress(true);
    let callApi = isPinned ? unpin : pin;

    callApi({ postId: match.params.postId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error. Pin function could not work."
        });
        setProgress(false);
      } else {
        setIsPinned(data.pinned);
        setProgress(false);
      }
    });
  };

  if (redirect) {
    return <NotFound text="The Post" />;
  }

  return (
    <div>
      {matches ? (
        <Grid container spacing={3} sx={{ p: { xs: 1, sm: 2, md: 3, lg: 8 } }}>
          <Grid item md={7}>
            <div>
              {loading ? (
                <Stack spacing={2}>
                  <SideSkeleton />
                  {[1, 2, 3, 4, 5].map((n) => (
                    <PostSkelaton key={n} />
                  ))}
                </Stack>
              ) : (
                <Stack spacing={1}>
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
                    <Comments
                      comments={comments}
                      removeComment={removeComment}
                      header="Comments"
                    />
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
                        To see the commments section , you must be Football
                        Worker !
                      </Typography>
                      <WebSiteLink text="Be Worker" link="/" />
                    </Box>
                  )}
                </Stack>
              )}
            </div>
          </Grid>
          <Grid item md={5}>
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
            ) : (
              <SideList posts={values.related} header="Related Posts" />
            )}
          </Grid>
        </Grid>
      ) : (
        <div>
          {loading ? (
            <Stack spacing={2}>
              <SideSkeleton />
              {[1, 2, 3, 4, 5].map((n) => (
                <PostSkelaton key={n} />
              ))}
            </Stack>
          ) : (
            <Stack spacing={1}>
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
                <Comments
                  comments={comments}
                  removeComment={removeComment}
                  header="Comments"
                />
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
                  <WebSiteLink text="Be FW" link="/" />
                </Box>
              )}
            </Stack>
          )}
        </div>
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
};

export default Post;

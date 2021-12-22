import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";


import auth from './../auth/auth-helper'
import {listByUser,listTopUser} from './api-comment'
import SnackError from "../errorHandler/SnackError";
import Comments from "./Comments";
import SideComments from './../components/design-aside/SideComments'
import PostSkelaton from "../components/skelatons/PostSkelaton";



export default function UserComments({match}) {
  const [comments, setComments] = useState([])
  const [bestie, setBestie] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState({
    openSnack: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  // Load All Comments
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController()
    const signal = abortController.signal

    listByUser({userId:match.params.userId},{t:jwt.token},signal).then((data)=>{
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Comments could not be loaded."
        });
      }else{
        setComments(data)
        setLoading(false);
      }
    })

    return () => {
      abortController.abort()
    }
  }, [match.params.userId])

  // Load Bestie
  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController()
    const signal = abortController.signal

    listTopUser({userId:match.params.userId},{t:jwt.token}, signal).then((data)=>{
      if(data && data.error){
        setIsError({
          ...isError,
          openSnack: true,
          error: "500 Server Error! Best Comments could not be loaded.",
        });
      }else{
        setBestie(data)
        setLoading(false);
      }
    })

    return () => {
      abortController.abort()
    }
  }, [match.params.userId])


  // Remove Comment by Editing
  const removeComment = (comment) => {
    const updatedComments = [...comments];
    const index = updatedComments.indexOf(comment);
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };


  return (
    <div>
      <Grid container spacing={2} sx={{p:{
        xs: 1,
        md: 2,
        lg: 4
      }}} >
        <Grid item xs={12} md={5}  >
        {loading ? (
            [1, 2, 3].map((n) => <PostSkelaton key={n} />)
          ) : (
            <SideComments comments={bestie} header="Top Comments" />
          )}
        </Grid>
        <Grid item xs={12} md={7} >
        {loading ? (
            [1, 2, 3, 4, 5].map((n) => <PostSkelaton key={n} />)
          ) : (
            <Comments
              comments={comments}
              removeComment={removeComment}
              header="All Comments"
            />
          )}
        </Grid>
      </Grid>
      <SnackError open={isError.openSnack} text={isError.error} />
    </div>
  );
}


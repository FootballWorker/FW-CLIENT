import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

import auth from "./../auth/auth-helper";
import {list} from './../department/api-department'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Loading from '../components/loading/Loading';


export default function Home({ history }) {
  const [defaultPage, setDefaultPage] = useState(false);
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDefaultPage(auth.isAuthenticated());
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated());
    });
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true)

    list(signal).then((data)=>{
      if(data && data.error){
        console.log(data.error)
      }else{
        setDepartments(data)
        setLoading(false);
      }
    })
    return () => {
      abortController.abort()
    }
  }, [])


  if(loading){
    return <Loading />
  }

  return (
    <div >
      {!defaultPage && (
        <div>Guest Page</div>
      )}
      {defaultPage && <p>User Page</p>}
      <List sx={{margin:"normal"}} >
        {
          departments && departments.map((item,i)=>(
            <Link to={"/departments/"+item._id} key={i} >
              <ListItem>
                <ListItemText primary={item.name} secondary={item.views} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </div>
  );
}

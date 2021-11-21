import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Avatar, Divider, List,ListItem, ListItemAvatar, ListItemText , Paper } from '@mui/material'
import config from './../../config/config.js'
import defaultPic from './../../assets/images/default-news.jpg'
import ListHeader from '../header/ListHeader.js'
import kFormatter from '../numbers.js'


export default function BestieNews(props) {
  return (
    <div>
      <Paper elevation={12} >
        {
          props.header && (
            <ListHeader header={props.header} />
          )
        }
        <Divider />
        <List>
          {props.news && props.news.map((item,i)=>(
            <Link to={"/news/"+ item._id} key={i} >
              <ListItem  >
                <ListItemAvatar>
                  <Avatar src={item.photo
                          ? config.ServerURI + "/api/news/photo/" + item._id
                          : defaultPic}  />
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={"Total Subscribers : " + kFormatter(item.subscriberLength)} />
              </ListItem>
            </Link>  
          ))}
        </List>
      </Paper>
    </div>
  )
}



BestieNews.propTypes = {
  news : PropTypes.array.isRequired,
  header : PropTypes.string
} 
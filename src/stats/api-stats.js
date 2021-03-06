import {config,errorHandler} from './../config/config.js'



const totalUser = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/total/likes/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
    
  }
}

const totalUserComment = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/total/comment/likes/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
    
  }
}

const totalNews = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/total/likes/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
    
  }
}

const totalFollowers = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/total/followers/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
    
  }
}

const totalValue = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/total/value/players/"+params.teamId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
    
  }
}


export {
  totalUser,
  totalUserComment,
  totalNews,
  totalFollowers,
  totalValue
}
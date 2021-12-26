import {config,errorHandler} from './../config/config.js'



const create = async (params,credentials,comment) => {
  try {
    let response = await fetch(config.ServerURI + "/comments/" + params.postId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: comment
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/comments/" + params.postId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  }catch(error){
    errorHandler(error)
  }
}

const listRelated = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/comments/related/"+params.commentId,{
      method: 'GET',
      signal:signal,
      headers : {
        'Accept' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/comments/by/" + params.userId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listTopPost = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/best/comments/"+params.postId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listTopUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/bestcomments/"+params.userId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t 
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/singlecomment/" + params.commentId,{
      method: 'GET',
      signal:signal,
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/singlecomment/" + params.commentId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const like = async (params,credentials,commentId) => {
  try {
    let response = await fetch(config.ServerURI + "/comments/like",{
      method: 'PUT',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        commentId: commentId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unlike = async (params, credentials,commentId) => {
  try {
    let response = await fetch(config.ServerURI + "/comments/unlike",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        commentId: commentId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}





export {
  create,
  list,
  listRelated,
  listByUser,
  listTopPost,
  listTopUser,
  read,
  remove,
  like,
  unlike
}
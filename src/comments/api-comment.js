import config from './../config/config.js'


const create = async (params,credentials,comment) => {
  try {
    let response = await fetch(config.ServerURI + "/api/comments/" + params.postId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: comment
    });
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const list = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/api/comments/" + params.postId,{
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
    console.log(error)
  }
}

const listRelated = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/comments/related/"+params.commentId,{
      method: 'GET',
      signal:signal,
      headers : {
        'Accept' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listByUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/comments/by/" + params.userId,{
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
    console.log(error)
  }
}

const listTopPost = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/best/comments/"+params.postId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listTopUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/bestcomments/"+params.userId,{
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
    console.log(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/singlecomment/" + params.commentId,{
      method: 'GET',
      signal:signal,
    });
    return await response.json()
  } catch (error) {
    console.log()
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/singlecomment/" + params.commentId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const like = async (params,credentials,commentId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/comments/like",{
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
    console.log(error)
  }
}

const unlike = async (params, credentials,commentId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/comments/unlike",{
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
    console.log()
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
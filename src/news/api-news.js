import {config,errorHandler} from './../config/config.js'


const create = async (credentials,news) => {
  try {
    let response = await fetch(config.ServerURI + '/news',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: news
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/news/'+params.newsId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/news',{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization' :'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listTop = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + '/topnews',{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/news/by/'+params.userId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}



const update = async (params,credentials,news) => {
  try {
    let response = await fetch(config.ServerURI + '/news/' + params.newsId,{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body : news
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + '/news/'+ params.newsId,{
      method: 'DELETE',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + credentials.t 
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}



const hireEditor = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/hireEditor",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireEmployee = async (params,credentials,newsId) => {
  try {
    let response  = await fetch(config.ServerURI + '/hireEmployee',{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body :  JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
} 

const fireEditor = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/fireEditor",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireEmployee = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + '/fireEmployee',{
      method: 'PUT',
      headers:{
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const subscribe = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + '/subscribe/news',{
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unsubscribe = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/unsubscribe/news", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId:newsId
      }),
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const apply = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/apply/for/news",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
	      'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const cancelApply = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/cancel/apply/news",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
	      'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        newsId: newsId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


export {
  create,
  read,
  update,
  remove,
  list,
  listByUser,
  listTop,
  hireEditor,
  hireEmployee,
  fireEditor,
  fireEmployee,
  subscribe,
  unsubscribe,
  apply,
  cancelApply
}
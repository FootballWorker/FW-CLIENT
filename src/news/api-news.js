import config from './../config/config.js'


const create = async (credentials,news) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news',{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: news
    })
    return await response.json()
  } catch (error) {
  }
}

const read = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news/'+params.newsId,{
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
  }
}

const list = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news',{
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
  }
}

const listTop = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/topnews',{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const listByUser = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news/by/'+params.userId,{
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
  }
}



const update = async (params,credentials,news) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news/' + params.newsId,{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body : news
    })
    return await response.json()
  } catch (error) {
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + '/api/news/'+ params.newsId,{
      method: 'DELETE',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + credentials.t 
      }
    })
    return await response.json()
  } catch (error) {
  }
}



const hireEditor = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hireEditor",{
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
  }
}

const hireEmployee = async (params,credentials,newsId) => {
  try {
    let response  = await fetch(config.ServerURI + '/api/hireEmployee',{
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
  }
} 

const fireEditor = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fireEditor",{
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
  }
}

const fireEmployee = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + '/api/fireEmployee',{
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
  }
}

const subscribe = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + '/api/subscribe/news',{
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
  }
}

const unsubscribe = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/unsubscribe/news", {
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
  }
}

const apply = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/apply/for/news",{
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
  }
}

const cancelApply = async (params,credentials,newsId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/cancel/apply/news",{
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
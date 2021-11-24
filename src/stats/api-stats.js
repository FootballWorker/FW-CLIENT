import config from './../config/config'

const totalUser = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/total/likes/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const totalUserComment = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/total/comment/likes/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const totalNews = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/total/likes/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const totalFollowers = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/total/followers/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}


export {
  totalUser,
  totalUserComment,
  totalNews,
  totalFollowers
}
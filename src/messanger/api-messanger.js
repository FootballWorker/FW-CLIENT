import {config,errorHandler} from './../config/config.js'



const createChats = async (params,credentials,name) => {
  try {
    let response = await fetch(config.ServerURI + "/chats",{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        userId: params.userId,
        name:name
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const readChat = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/chat/"+params.chatId,{
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listChats = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/"+params.userId,{
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unRead = async (credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/unread/chats",{
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listMessages = async (params) => {
  try {
    let response = await fetch(config.ServerURI + "/messages/"+ params.chatId,{
      method:'GET',
      headers: {
        'Accept':'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listGroups = async (credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/groups",{
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const renameGroup = async (params,credentials,chatName) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/rename",{
      method:'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        chatId : params.chatId,
        chatName: chatName
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const addToGroup = async (params,credentials,userId) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/new/user",{
      method:'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        chatId : params.chatId,
        userId: userId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const removeFromGroup = async (params,credentials,userId) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/groupremove",{
      method:'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        chatId : params.chatId,
        userId: userId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const createTeamChat = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/chats/team",{
      method:'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body : JSON.stringify({chatName: params.chatName})
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


const listTeamWorkers = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/workers/"+params.teamId,{
      method:'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


export {
  createChats,
  readChat,
  listChats,
  listMessages,
  listGroups,
  unRead,
  renameGroup,
  addToGroup,
  removeFromGroup,
  createTeamChat,
  listTeamWorkers
}
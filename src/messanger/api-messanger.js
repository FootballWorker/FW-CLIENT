import {config,errorHandler} from './../config/config.js'



const createChats = async (params,credentials,name) => {
  try {
    let response = await fetch(config.ServerURI + "/api/chats",{
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
    let response = await fetch(config.ServerURI + "/api/chat/"+params.chatId,{
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
    let response = await fetch(config.ServerURI + "/api/chats/"+params.userId,{
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
    let response = await fetch(config.ServerURI + "/api/unread/chats",{
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
    let response = await fetch(config.ServerURI + "/api/messages/"+ params.chatId,{
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
    let response = await fetch(config.ServerURI + "/api/chats/groups",{
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
    let response = await fetch(config.ServerURI + "/api/chats/rename",{
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
    let response = await fetch(config.ServerURI + "/api/chats/new/user",{
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
    let response = await fetch(config.ServerURI + "/api/chats/groupremove",{
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
    let response = await fetch(config.ServerURI + "/api/chats/team",{
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
    let response = await fetch(config.ServerURI + "/api/workers/"+params.teamId,{
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
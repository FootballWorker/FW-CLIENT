import queryString from 'query-string'
import {config,errorHandler} from './../config/config.js'



const create = async (params,credentials,match) => {
  try {
    let response = await fetch(config.ServerURI + "/newmatch/to/"+params.teamId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      	'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(match)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/matches/"+ params.matchId,{
      method: 'GET',
      signal: signal,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params,credentials,matchData) => {
  try {
    let response = await fetch(config.ServerURI + "/matches/"+params.matchId,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + credentials.t
      },
      body : JSON.stringify(matchData)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/matches/"+ params.matchId,{
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

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/matches",{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByTeam = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/matches/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const latestMatches = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/latest/matches/by/"+params.teamId,{
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listForHome = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/country/matches",{
      method: 'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const searchMatchByTeam = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/search/matches/by/team?"+query,{
      method: 'GET'
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByAudience = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/topmatches/by/audience",{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const searchForMatch = async (params,signal) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/search/for/matches?"+query,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const audience = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/audience/match",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        matchId: matchId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const disaudience = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/disaudience/match", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        matchId: matchId,
      }),
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const predictHome = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/prediction/home",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        matchId: matchId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const predictDraw = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/prediction/draw",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        matchId: matchId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const predictAway = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/prediction/away",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        matchId: matchId
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
  listByTeam,
  latestMatches,
  searchMatchByTeam,
  listForHome,
  listByAudience,
  searchForMatch,
  audience,
  disaudience,
  predictHome,
  predictDraw,
  predictAway,
}
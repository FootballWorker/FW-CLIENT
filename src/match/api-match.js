import queryString from 'query-string'
import config from './../config/config.js'


const create = async (params,credentials,match) => {
  try {
    let response = await fetch(config.ServerURI + "/api/newmatch/to/"+params.teamId,{
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
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matches/"+ params.matchId,{
      method: 'GET',
      signal: signal,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
  }
}

const update = async (params,credentials,matchData) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matches/"+params.matchId,{
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
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matches/"+ params.matchId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
  }
}

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matches",{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
  }
}

const listByTeam = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matches/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
      }
    })
    return await response.json()
  } catch (error) {
  }
}

const latestMatches = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/latest/matches/by/"+params.teamId,{
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (error) {
  }
}

const listForHome = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/country/matches",{
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
  }
}

const searchMatchByTeam = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/api/search/matches/by/team?"+query,{
      method: 'GET'
    })
    return await response.json()
  } catch (error) {
  }
}

const listByAudience = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/topmatches/by/audience",{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const searchForMatch = async (params,signal) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/api/search/for/matches?"+query,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const audience = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/audience/match",{
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
  }
}

const disaudience = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/disaudience/match", {
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
  }
}

const predictHome = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/prediction/home",{
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
  }
}

const predictDraw = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/prediction/draw",{
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
  }
}

const predictAway = async (params,credentials,matchId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/prediction/away",{
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
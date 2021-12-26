import queryString from "query-string"
import {config,errorHandler} from './../config/config.js'



const create = async (credentials,team) => {
  try {
    let response = await fetch(config.ServerURI + "/new/team",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(team)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/teams/" + params.teamId,{
      method: 'GET',
      signal: signal,
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/teams",{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept': 'applicaiton/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByStar = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/teams/by/stars",{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listCountries = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/teams/countries",{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const searchForTeams = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/searching/for/teams?"+query,{
      method: 'GET',
    })

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listLikedTeam = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/liked/teams/by/" + params.userId, {
      method: "GET",
      signal:signal,
      headers: {
        "Accept": "application/json",
        "Authorization": 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
    console.log("500 Server Error!")
  }
}

const update = async (params,credentials,team) => {
  try {
    let response = await fetch(config.ServerURI + "/teams/" + params.teamId, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + credentials.t
      },
      body : JSON.stringify(team)
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/teams/"+params.teamId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const star = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/staring/team/",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unstar = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/unstaring/team/",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

// ----------------------------- HIRE AND FIRE ------------------------------

const hirePresident = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/president",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type': 'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    }) 
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const firePresident = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/fire/from/president",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireVice = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/vicePresident",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId:teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireVice = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/fire/from/vicePresident",{
      method :'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId:teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireManager = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/manager",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireManager = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/firemanager",{
      method :'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type':'application/json',
        'Authorization' :'Bearer '+credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireCoach = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/coach",{
      method :'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type':'application/json',
        'Authorization' :'Bearer '+credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireCoach = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/fire/from/coach",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId:params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireScout = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/scout",{
      method :'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireScout = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/fire/from/scout",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const hireYouth = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/hire/as/youth",{
      method:'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const fireYouth = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/fire/from/youth",{
      method: 'PUT',
      headers: {
        'Accept':'applicaiton/json',
        'Content-Type' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const runFor = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/run/election",{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId:params.userId,
        teamId:teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const cancelCandidate = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/cancel/run/election",{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const apply = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/apply/for/team",{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const cancelApply = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/cancel/apply/team",{
      method: 'PUT',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        teamId: teamId
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
  list,
  listByStar,
  listCountries,
  searchForTeams,
  listLikedTeam,
  update,
  remove,
  star,
  unstar,
  hirePresident,
  firePresident,
  hireVice,
  fireVice,
  hireManager,
  fireManager,
  hireCoach,
  fireCoach,
  hireScout,
  fireScout,
  hireYouth,
  fireYouth,
  runFor,
  cancelCandidate,
  apply,
  cancelApply
}
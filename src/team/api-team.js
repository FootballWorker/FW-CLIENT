import queryString from "query-string"
import config from './../config/config.js'



const create = async (credentials,team) => {
  try {
    let response = await fetch(config.ServerURI + "/api/new/team",{
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
    console.log(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams/" + params.teamId,{
      method: 'GET',
      signal: signal,
    });
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams",{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept': 'applicaiton/json',
        'Content-Type': 'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listByStar = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams/by/stars",{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listCountries = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams/countries",{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const searchForTeams = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/api/searching/for/teams?"+query,{
      method: 'GET',
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const update = async (params,credentials,team) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams/" + params.teamId, {
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
    console.log(error)
  }
} 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/teams/"+params.teamId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const star = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/staring/team/",{
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
    console.log(error)
  }
}

const unstar = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/unstaring/team/",{
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
    console.log(error)
  }
}

// ----------------------------- HIRE AND FIRE ------------------------------

const hirePresident = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/president",{
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
    console.log(error)
  }
}

const firePresident = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fire/from/president",{
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
    console.log(error)
  }
}

const hireVice = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/vicePresident",{
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
    console.log(error)
  }
}

const fireVice = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fire/from/vicePresident",{
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
    console.log(error)
  }
}

const hireManager = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/manager",{
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
    console.log(error)
  }
}

const fireManager = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/firemanager",{
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
    console.log(error)
  }
}

const hireCoach = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/coach",{
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
    console.log(error)
  }
}

const fireCoach = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fire/from/coach",{
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
    console.log(error)
  }
}

const hireScout = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/scout",{
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
    console.log(error)
  }
}

const fireScout = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fire/from/scout",{
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
    console.log(error)
  }
}

const hireYouth = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/hire/as/youth",{
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
    console.log(error)
  }
}

const fireYouth = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/fire/from/youth",{
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
    console.log(error)
  }
}

const runFor = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/run/election",{
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
    console.log(error)
  }
}

const cancelCandidate = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/cancel/run/election",{
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
    console.log(error)
  }
}

const apply = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/apply/for/team",{
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
    console.log(error)
  }
}

const cancelApply = async (params,credentials,teamId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/cancel/apply/team",{
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
    console.log(error)
  }
}



export {
  create,
  read,
  list,
  listByStar,
  listCountries,
  searchForTeams,
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
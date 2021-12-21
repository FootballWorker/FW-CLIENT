import config from './../config/config.js'


const create = async ( params,credentials,poll) => {
  try{
    let response = await fetch(config.ServerURI + "/api/polls/for/" + params.teamId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(poll),
    });
    return await response.json()
  }catch(error){
  }
}

const read = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/api/polls/" + params.pollId,{
      method: "GET",
      signal: signal,
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + credentials.t
      }
    })
    return await response.json()
  }catch(error){
  }
}

const pollListByTeam = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/polls/for/"+params.teamId,{
      method: 'GET',
      signal: signal
    })
    return await response.json()
  } catch (error) {
  }
}

const openPolls = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/polls",{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const vote = async (params,credentials,userId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/polls/vote/for",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({pollId:params.pollId,userId:userId})
    })
    return await response.json()
  } catch (error) {
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/polls/"+ params.pollId,{
      method: 'DELETE',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization':'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
  }
}








export {
  create,
  read,
  pollListByTeam,
  openPolls,
  vote,
  remove
}
import {config,errorHandler} from './../config/config.js'




const create = async (params,credentials,job) => {
  try{
    let response = await fetch(config.ServerURI + '/api/jobs/by/'+params.departmentId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization" : 'Bearer ' + credentials.t
      },
      body: JSON.stringify(job)
    })
    return await response.json()
  }catch(error){
    errorHandler(error)
  }
}

const listJobs = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/jobs",{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByDepartment = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/jobs/by/"+ params.departmentId,{
      method: 'GET',
      signal:signal
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const bestWorkers = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/best/workers/by/'+params.jobId,{
      method: 'GET',
      signal:signal,
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

const vacantJobs = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/vacant/jobs/"+params.jobId,{
      method: 'GET',
      signal:signal,
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

const read = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/jobs/"+ params.jobId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }})
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params,credentials,job) => {
  try {
    let response = await fetch(config.ServerURI + "/api/jobs/"+ params.jobId,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(job)
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const remove = async (params,credentials,job) => {
  try {
    let response = await fetch(config.ServerURI + "/api/jobs/"+ params.jobId,{
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



export  {
  create,
  listJobs,
  listByDepartment,
  bestWorkers,
  vacantJobs,
  read,
  update,
  remove
}


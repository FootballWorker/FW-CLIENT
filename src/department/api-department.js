import {config,errorHandler} from './../config/config.js'



const create = async (credentials,department) => {
  try {
    let response = await fetch(config.ServerURI + '/api/departments',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(department)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/departments/'+ params.departmentId,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/departments',{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const update = async (params, credentials, department) => {
  try {
    let response = await fetch(config.ServerURI + "/api/departments/" + params.departmentId, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
	'Content-Type': 'application/json',
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(department)
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
}; 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/departments/"+params.departmentId,{
      method: 'DELETE',
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}



export { create,list, read, update, remove };

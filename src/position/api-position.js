import config from './../config/config.js'


const create = async (credentials,position) => {
  try {
    let response = await fetch(config.ServerURI + "/api/new/position",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(position)
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const listPositions = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/positions", {
      method: "GET",
      signal:signal
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/position/" + params.positionId, {
      method: "GET",
      signal: signal,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error)
  }
};

const update = async (params, credentials, position) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/position/" + params.positionId,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
        body: position,
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}; 

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/position/"+params.positionId,{
      method: 'DELETE',
      headers: {
        'Accept' :'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    console.log()
  }
}

export {
  create,
  read,
  listPositions,
  update,
  remove
}
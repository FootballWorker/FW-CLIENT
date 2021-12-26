import {config,errorHandler} from './../config/config.js'



const create = async (params,credentials,attribute) => {
  try {
    let response = await fetch(config.ServerURI + "/record/attribute/"+ params.playerId,{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify(attribute)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const read = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/attributes/" + params.attributeId,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const scoresByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/assessments/user/" + params.playerId,
      {
        method: "GET",
        signal: signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const listAttributes = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/attributes/by/" + params.playerId,
      {
        method: "GET",
        signal: signal,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const updateAttribute = async (credentials, attribute) => {
  try {
    let response = await fetch(
      config.ServerURI + "/attributes/rescore",
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
        body: JSON.stringify(attribute),
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/attributes/" + params.attributeId,
      {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const averageAttributes = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/attributes/category/averages/"+params.playerId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


export {
  create,
  read,
  averageAttributes,
  scoresByUser,
  listAttributes,
  updateAttribute,
  remove,
}
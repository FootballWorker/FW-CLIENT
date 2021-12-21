import config from './../config/config.js'


const create = async (params,credentials,attribute) => {
  try {
    let response = await fetch(config.ServerURI + "/api/record/attribute/"+ params.playerId,{
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
    
  }
}

const read = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/attributes/" + params.attributeId,
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
    console.log("500 Server Error!");
  }
};

const scoresByUser = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/assessments/user/" + params.playerId,
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
    console.log("500 Server Error!")
  }
};

const listAttributes = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/attributes/by/" + params.playerId,
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
    console.log("500 Server Error!");
  }
};

const updateAttribute = async (credentials, attribute) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/attributes/rescore",
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
    console.log("500 Server Error!")
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/api/attributes/" + params.attributeId,
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
    console.log("500 Server Error!")
  }
};

const averageAttributes = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/attributes/category/averages/"+params.playerId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    
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
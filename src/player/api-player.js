import queryString from "query-string";
import {config,errorHandler} from './../config/config.js'




const create = async (params, credentials, player) => {
  try {
    let response = await fetch(config.ServerURI + "/api/new/player/to/" + params.teamId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify(player)
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const list = async (credentials, signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/players", {
      method: "GET",
      signal: signal,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const listByTeam = async (params, signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/players/by/" + params.teamId, {
      method: "GET",
      signal: signal
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const listPlayerByStar = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/playerstars", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const searchForPlayer = async (params) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch(config.ServerURI + "/api/search/players?" + query,{
      method: 'GET',
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
};

const read = async (params, signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/players/" + params.playerId, {
      method: "GET",
      signal: signal,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const update = async (params, credentials, player) => {
  try {
    let response = await fetch(config.ServerURI + "/api/players/" + params.playerId, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: player,
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/players/" + params.playerId, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const star = async (params, credentials, playerId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/starplayers", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        playerId: playerId,
      }),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const unstar = async (params, credentials, playerId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/unstarplayers", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        playerId: playerId,
      }),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};



export {
  create,
  list,
  listByTeam,
  listPlayerByStar,
  searchForPlayer,
  read,
  update,
  remove,
  star,
  unstar,
};

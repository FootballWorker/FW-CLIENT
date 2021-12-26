import queryString from "query-string";
import { config, errorHandler } from "./../config/config.js";

const create = async (user) => {
  try {
    let response = await fetch(config.ServerURI + "/users", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const activation = async (params) => {
  try {
    let response = await fetch(
      config.ServerURI + "/activation/" + params.activationToken,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/users", {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const searchForUser = async (params) => {
  const query = queryString.stringify(params);
  try {
    let response = await fetch(config.ServerURI + "/searchusers?" + query, {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/users/" + params.userId,
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
    errorHandler(error);
  }
};

const update = async (params, credentials, user) => {
  try {
    let response = await fetch(
      config.ServerURI + "/users/" + params.userId,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
        body: user,
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const updateBackground = async (params, credentials, user) => {
  try {
    let response = await fetch(
      config.ServerURI + "/background/" + params.userId,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
        body: user,
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const changeFavorite = async (params, credentials, favoriteTeam) => {
  try {
    let response = await fetch(config.ServerURI + "/changeFavorite", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        favoriteTeam: favoriteTeam,
      }),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/users/" + params.userId,
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
    errorHandler(error);
  }
};

const follow = async (params, credentials, followId) => {
  try {
    let response = await fetch(config.ServerURI + "/following/user", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({
        userId: params.userId,
        followId: followId,
      }),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const unfollow = async (params, credentials, unfollowId) => {
  try {
    let response = await fetch(config.ServerURI + "/unfollowing/user", {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: JSON.stringify({ userId: params.userId, unfollowId: unfollowId }),
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const followers = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/followers/by/" + params.userId,
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
    errorHandler(error);
  }
};

const followings = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/followings/by/" + params.userId,
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
    errorHandler(error);
  }
};

// ------------------------ Applicants --------------------------------

const applicants = async (params, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/applicants/by/" + params.teamId,
      {
        method: "GET",
        signal: signal,
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const newsApplicants = async (params, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/newsapplications/by/" + params.newsId,
      {
        method: "GET",
        signal: signal,
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

// ------------------------ Ntfcations ------------------------------

const sendNtf = async (params, credentials, ntf) => {
  try {
    let response = await fetch(
      config.ServerURI + "/newntf/" + params.userId,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + credentials.t,
        },
        body: JSON.stringify(ntf),
      }
    );
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const listNtf = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/notifications/by/" + params.userId,
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
    errorHandler(error);
  }
};

const readNtf = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      config.ServerURI + "/notifications/" + params.notificationId,
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
    errorHandler(error);
  }
};

const listUnread = async (credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/unread/notifications", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

const removeNtf = async (params, credentials) => {
  try {
    let response = await fetch(
      config.ServerURI + "/notifications/" + params.notificationId,
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
    errorHandler(error);
  }
};

const removeAll = async (credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/remove/notifications", {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (error) {
    errorHandler(error);
  }
};

export {
  create,
  activation,
  list,
  searchForUser,
  read,
  update,
  updateBackground,
  changeFavorite,
  remove,
  follow,
  unfollow,
  followers,
  followings,
  applicants,
  newsApplicants,
  sendNtf,
  readNtf,
  listNtf,
  listUnread,
  removeAll,
  removeNtf,
};

import {config,errorHandler} from './../config/config.js'




// ---------------- CREATING APIs ------------------ 

const createForNews = async (params,credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + "/newsposts/by/" + params.newsId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: post
    });
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const createForTeam = async (params, credentials, post) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/by/" + params.teamId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: post,
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const createForPlayer = async (params, credentials, post) => {
  try {
    let response = await fetch(config.ServerURI + "/playerposts/by/" + params.playerId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: post,
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const createForMatch = async (params,credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + '/matchposts/by/'+params.matchId,{
      method: 'POST',
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: post
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


// ------------------ LISTING APIs ---------------------

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/posts",{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

// -------------------- READ and UPDATE APIs ------------------------

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/" + params.postId,{
      method: 'GET',
      signal: signal,

    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/" + params.postId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByFollowings = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/followingposts/feed/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByUser = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + '/whole/posts/for/' + params.userId,{
      method: 'GET',
      signal : signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  }catch(error){
    errorHandler(error)
  }
}

const listPostByTeam = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/posts/by/" + params.teamId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  }catch(error){
    errorHandler(error)
  }
}

const listByPlayer = async (params,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/playerposts/by/" + params.playerId,{
      method: 'GET',
      signal:signal
    });
    return await response.json()
  }catch(error){
    errorHandler(error)
  }
}

const listByMatch = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/matchposts/by/"+params.matchId,{
      method:'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const postListByDepartment = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/departmentposts/by/" + params.departmentId, {
      method: "GET",
      signal:signal
    });
    return await response.json();
  } catch (error) {
    errorHandler(error)
  }
};

const postListByJob = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/jobposts/by/"+params.jobId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  }catch(error) {
    errorHandler(error)
  }
}

const postListByNews = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/newsposts/by/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listPinned = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/posts/pinned/'+params.newsId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}




// -------------------- LIST FOR ASIDE POSTS -----------------------

const listRelated = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/posts/related/to/"+params.postId,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listBestMatch = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/best/posts/for/"+params.matchId,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const latestTeam = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/latest/team/feed",{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' :'application/json',
        'Authorization':'Bearer '  + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
} 

// -------------------- LIST FOR TEAM PAGE -------------------------

const listByPresident = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/president/posts/by/"+params.teamId,{
      method:'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByVicePresident = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/vicePresident/posts/by/"+params.teamId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByManager = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/manager/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,

    })
    return response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByCoach = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/coach/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByScout = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/scout/posts/by/"+params.teamId,{
      method: 'GET',
      signa: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const listByYouth = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/youth/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

// --------------------- LIKE APIs --------------------------

const like = async (params,credentials,postId) => {
  try {
    let response = await fetch(config.ServerURI + "/liking/post",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unlike = async (params,credentials,postId) => {
  try {
    let response = await fetch(config.ServerURI + "/unliking/post",{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


// --------------------- PIN APIs  --------------------------

const pin = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/pin/post",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body: JSON.stringify({postId: params.postId})
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const unpin = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/unpin/post",{
      method: 'PUT',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json',
        'Authorization' :'Bearer ' + credentials.t
      },
      body : JSON.stringify({
        postId: params.postId
      })
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}


// Complain

const complain = async (content) => {
  try {
    let response = await fetch(config.ServerURI + "/complain/post",{
      method:'POST',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json'
      },
      body: JSON.stringify(content)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

export {
  createForNews,
  createForTeam,
  createForPlayer,
  createForMatch,
  list,
  listByFollowings,
  listByUser,
  listPostByTeam,
  listByPlayer,
  listByMatch,
  postListByDepartment,
  postListByJob,
  postListByNews,
  listBestMatch,
  latestTeam,
  listPinned,
  listRelated,
  listByPresident,
  listByVicePresident,
  listByManager,
  listByCoach,
  listByScout,
  listByYouth,
  read,
  remove,
  like,
  unlike,
  pin,
  unpin,
  complain
};
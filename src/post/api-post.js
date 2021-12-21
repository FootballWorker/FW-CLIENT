import config from './../config/config.js'

// ---------------- CREATING APIs ------------------ 

const createForNews = async (params,credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + "/api/newsposts/by/" + params.newsId,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      },
      body: post
    });
    return await response.json()
  } catch (error) {
  }
}

const createForTeam = async (params, credentials, post) => {
  try {
    let response = await fetch(config.ServerURI + "/api/posts/by/" + params.teamId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: post,
    });
    return await response.json();
  } catch (error) {
  }
};

const createForPlayer = async (params, credentials, post) => {
  try {
    let response = await fetch(config.ServerURI + "/api/playerposts/by/" + params.playerId, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + credentials.t,
      },
      body: post,
    });
    return await response.json();
  } catch (error) {
  }
};

const createForMatch = async (params,credentials,post) => {
  try {
    let response = await fetch(config.ServerURI + '/api/matchposts/by/'+params.matchId,{
      method: 'POST',
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: post
    })
    return await response.json()
  } catch (error) {
  }
}


// ------------------ LISTING APIs ---------------------

const list = async (signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/posts",{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
  }
}

// -------------------- READ and UPDATE APIs ------------------------

const read = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/posts/" + params.postId,{
      method: 'GET',
      signal: signal,

    })
    return await response.json()
  } catch (error) {
  }
}

const remove = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/posts/" + params.postId,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
  }
}

const listByFollowings = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/followingposts/feed/"+params.userId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listByUser = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + '/api/whole/posts/for/' + params.userId,{
      method: 'GET',
      signal : signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  }catch(error){
  }
}

const listPostByTeam = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/api/posts/by/" + params.teamId,{
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    });
    return await response.json()
  }catch(error){
  }
}

const listByPlayer = async (params,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/api/playerposts/by/" + params.playerId,{
      method: 'GET',
      signal:signal
    });
    return await response.json()
  }catch(error){
  }
}

const listByMatch = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/matchposts/by/"+params.matchId,{
      method:'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const postListByDepartment = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/departmentposts/by/" + params.departmentId, {
      method: "GET",
      signal:signal
    });
    return await response.json();
  } catch (error) {
  }
};

const postListByJob = async (params,credentials,signal) => {
  try{
    let response = await fetch(config.ServerURI + "/api/jobposts/by/"+params.jobId,{
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
  }
}

const postListByNews = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/newsposts/by/"+params.newsId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listPinned = async (params,credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + '/api/posts/pinned/'+params.newsId,{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' :'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
    })
    return await response.json()
  } catch (error) {
  }
}




// -------------------- LIST FOR ASIDE POSTS -----------------------

const listRelated = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/posts/related/to/"+params.postId,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const listBestMatch = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/best/posts/for/"+params.matchId,{
      method: 'GET',
      signal:signal
    })
    return await response.json()
  } catch (error) {
  }
}

const latestTeam = async (credentials,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/latest/team/feed",{
      method: 'GET',
      signal:signal,
      headers: {
        'Accept' :'application/json',
        'Authorization':'Bearer '  + credentials.t
      }
    })
    return await response.json()
  } catch (error) {
  }
} 

// -------------------- LIST FOR TEAM PAGE -------------------------

const listByPresident = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/president/posts/by/"+params.teamId,{
      method:'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listByVicePresident = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/vicePresident/posts/by/"+params.teamId,{
      method: 'GET',
      signal:signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listByManager = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/manager/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,

    })
    return response.json()
  } catch (error) {
  }
}

const listByCoach = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/coach/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listByScout = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/scout/posts/by/"+params.teamId,{
      method: 'GET',
      signa: signal,
    })
    return await response.json()
  } catch (error) {
  }
}

const listByYouth = async (params,signal) => {
  try {
    let response = await fetch(config.ServerURI + "/api/youth/posts/by/"+params.teamId,{
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch (error) {
  }
}

// --------------------- LIKE APIs --------------------------

const like = async (params,credentials,postId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/liking/post",{
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
  }
}

const unlike = async (params,credentials,postId) => {
  try {
    let response = await fetch(config.ServerURI + "/api/unliking/post",{
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
  }
}


// --------------------- PIN APIs  --------------------------

const pin = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/pin/post",{
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
  }
}

const unpin = async (params,credentials) => {
  try {
    let response = await fetch(config.ServerURI + "/api/unpin/post",{
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
  }
}


// Complain

const complain = async (content) => {
  try {
    let response = await fetch(config.ServerURI + "/api/complain/post",{
      method:'POST',
      headers: {
        'Accept' :'application/json',
        'Content-Type' :'application/json'
      },
      body: JSON.stringify(content)
    })
    return await response.json()
  } catch (error) {
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
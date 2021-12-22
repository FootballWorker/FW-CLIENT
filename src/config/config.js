const config = {
  ServerURI : 'https://footballworker.herokuapp.com',
  ClientURI : 'https://footballworker.net'
}

const isDev = false

const errorHandler = (error) => {
  if (isDev) {
    console.log(error)
  } else {
  }
}

export {config , errorHandler}
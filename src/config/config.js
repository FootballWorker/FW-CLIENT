const config = {
  ServerURI : 'https://footballworker.herokuapp.com',
  ClientURI : 'https://footballworker.net'
}

const isDev = true

const errorHandler = (error) => {
  if (isDev) {
    console.log(error)
  } else {
  }
}

export {config , errorHandler}
import {config,errorHandler} from './../config/config.js'


const signin = async (user) => {  
  try {    
    let response = await fetch(config.ServerURI + '/api/auth/signin', {      
      method: 'POST',      
      mode:'cors',
      headers: {        
        'Accept': 'application/json',        
        'Content-Type': 'application/json'      
      },      
      credentials: 'include',      
      body: JSON.stringify(user)    
    })    
    return await response.json()  
  } catch(error) {    
    errorHandler(error) 
  }
}

const contact = async (content) => {
  try {
    let response = await fetch(config.ServerURI + "/api/contact/mail",{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(content)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const presidentMail = async (content) => {
  try {
    let response = await fetch(config.ServerURI + "/api/presidentmail",{
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(content)
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const forgot = async (email) => {
  try {
    let response = await fetch(config.ServerURI + "/api/forgotpassword",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })

    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const reset = async (params,password) => {
  try {
    let response = await fetch(config.ServerURI + "/api/resetpassword/"+params.resetToken,{
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
      body: password
    })
    return await response.json()
  } catch (error) {
    errorHandler(error)
  }
}

const signout = async () => {  
  try {    
    let response = await fetch(config.ServerURI + '/api/auth/signout/', { method: 'GET' 
    })    
    return await response.json()  
  } catch(error) {    
    errorHandler(error) 
  }
}

export { signin,forgot,reset, contact, presidentMail , signout }
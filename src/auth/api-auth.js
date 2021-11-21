import config from './../config/config.js'
import queryString from 'query-string'


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
  } catch(err) {    
    console.log(err)  
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
}

const signout = async () => {  
  try {    
    let response = await fetch(config.ServerURI + '/api/auth/signout/', { method: 'GET' 
    })    
    return await response.json()  
  } catch(err) {    
    console.log(err)  
  }
}

export { signin,forgot,reset, contact, presidentMail , signout }
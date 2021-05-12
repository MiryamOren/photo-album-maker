import React, { useState, useEffect } from "react"
import jwtDecode from 'jwt-decode';
import LoginSignUp from '../login_or_sign_up/loginSignUp'
function Redirect({ component, APIpath, setUserFunc, user }) {
  const [token, setToken] = useState(null)
  useEffect(()=>{
    const tryGetToken = async () => {
      const localToken = localStorage.getItem("token");
      setToken(localToken);
    }
    tryGetToken()
  })
  
  return user? //(token &&  (jwtDecode(token).exp > Date.now() / 1000)) ?//Date.now() < JSON.parse(atob(token.split('.')[1])).exp) ? 
    component :
    <LoginSignUp APIpath={APIpath} setUserFunc={setUserFunc}/>
}

export default Redirect;
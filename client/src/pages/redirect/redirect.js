import React, { useState, useEffect } from "react"
import jwtDecode from 'jwt-decode';
import LoginSignUp from '../login_or_sign_up/loginSignUp'
import './redirect.css'
function Redirect({ component, APIpath, setUserFunc, user }) {
  const [token, setToken] = useState(null);

  useEffect(()=>{
    const tryGetToken = async () => {
      const localToken = localStorage.getItem("token");
      console.log(localToken)
      setToken(localToken);
    }
    tryGetToken()
  })
  const renderSpinner = () => {
    return <div className="spinner page"><img src="https://i.pinimg.com/originals/dd/67/4f/dd674f89d713bb2645a3292510219998.gif" alt=""/></div>
  }
  return (token &&  (jwtDecode(token).exp > Date.now() / 1000)) ?//Date.now() < JSON.parse(atob(token.split('.')[1])).exp) ? 
    (user? component: renderSpinner()) :
    <LoginSignUp APIpath={APIpath} setUserFunc={setUserFunc}/>
}

export default Redirect;
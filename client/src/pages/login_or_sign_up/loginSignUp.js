import React, { useState, useEffect } from "react"
import axios from "axios";
import Login from '../../components/login/login'
import SignUp from '../../components/sign_up/signUp'
import './loginSignUp.css'
function LoginSignUp({ APIpath, setUserFunc }) {
  const [loginOrSignUp, setLoginOrSignUp] = useState('login')
  const setToken = (data) => {
    localStorage.setItem('token', data.token);
    setUserFunc(data.user);
  }
  
  return (
    <div className="login-sign-up page">
      {loginOrSignUp === 'login' && <Login APIpath={APIpath} setUserFunc={setToken} setLoginOrSignUp={setLoginOrSignUp}/> }
      {loginOrSignUp === 'signUp' && <SignUp APIpath={APIpath} setUserFunc={setToken} setLoginOrSignUp={setLoginOrSignUp}/>}
    </div>
  )
}

export default LoginSignUp;
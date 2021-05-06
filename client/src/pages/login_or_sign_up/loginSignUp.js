import React, { useState, useEffect } from "react"
import axios from "axios";
import Login from '../../components/login/login'
import SignUp from '../../components/sign_up/signUp'
function LoginSignUp({ APIpath, setUserFunc }) {
  const setToken = (data) => {
    localStorage.setItem('token', data.token);
    setUserFunc(data.user);
  }
  
  return (
    <div className="login-sign-up page">
      <Login APIpath={APIpath} setUserFunc={setToken}/>    
      <SignUp APIpath={APIpath} setUserFunc={setToken}/>
    </div>
  )
}

export default LoginSignUp;
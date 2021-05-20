import React, { useState, useEffect } from "react"
import axios from "axios";
import InputWithLabale from '../input_with_labal/inputWithLabel'
function Login({ APIpath, setUserFunc, setLoginOrSignUp }) {
  const [user, setUser] = useState({});
  const login = async() => {
    try{
      const res = await axios.post(APIpath+'/users/login', user)
      setUserFunc(res.data)
    } catch(e){
      console.log(e)
    }
  }

  return(
    <div className="login-form">
      <h2>Log in</h2>
      <InputWithLabale 
        label="user name" 
        inputType="text" 
        callback={value => setUser({...user, userName: value})}
      />
      <InputWithLabale 
        label="password" 
        inputType="password" 
        callback={value => setUser({...user, password: value})}
      />
      <button onClick={login}>Log in</button>
      <button className="switch" onClick={() => setLoginOrSignUp('signUp')}>Not a member yet? Create New Account</button>
    </div>
  )
}

export default Login;
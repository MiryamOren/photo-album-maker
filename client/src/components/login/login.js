import React, { useState, useEffect } from "react"
import axios from "axios";
import InputWithLabale from '../input_with_labal/inputWithLabel'
function Login({ APIpath, setUserFunc }) {
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
        callback={e => setUser({...user, userName: e.target.value})}
      />
      <InputWithLabale 
        label="password" 
        inputType="password" 
        callback={e => setUser({...user, password: e.target.value})}
      />
      <button onClick={login}>Log in</button>
    </div>
  )
}

export default Login;
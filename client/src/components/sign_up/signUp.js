import React, { useState, useEffect } from "react"
import axios from "axios";
import InputWithLabale from '../input_with_labal/inputWithLabel'
function SignUp({ APIpath, setUserFunc }) {
  const [user, setUser] = useState({});
  const signUp = async() => {
    try{
      const res = await axios.post(APIpath+'/users/sign-up', user)
      setUserFunc(res.data)
    } catch(e){
      console.log(e)
    }
  }
  
  return(
    <div className="sign-up-form">
      <h2>Sign up</h2>
      <InputWithLabale 
        label="user name" 
        inputType="text" 
        callback={e => setUser({...user, userName: e.target.value})}
      />
      <InputWithLabale 
        label="name" 
        inputType="text" 
        callback={e => setUser({...user, name: e.target.value})}
      />
      <InputWithLabale 
        label="password" 
        inputType="password" 
        callback={e => setUser({...user, password: e.target.value})}
      />
      <button onClick={signUp}>Log in</button>
    </div>
  )
}

export default SignUp;
import React, { useState, useEffect } from "react"
import LoginSignUp from '../login_or_sign_up/loginSignUp'
function Redirect({ condition, component, APIpath, user, setUserFunc }) {
  return user? component : <LoginSignUp APIpath={APIpath} setUserFunc={setUserFunc}/>
}

export default Redirect;
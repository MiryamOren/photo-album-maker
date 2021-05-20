import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import './NavBar.css'
function NavBar({user, setUser}) {
  const logOut = async () => {
    console.log('logOut')
    setUser(null);
    localStorage.clear();
  }
  return (
    <ul className="NavBar">
    <li>
      <Link to="/">
        <img src="./static/logo.png" alt=""/>
        <div 
        style={{background: "url('./static/logo.png') no-repeat center center/cover", height:"3rem", width: "3rem"}}>
        </div>
      </Link>
    </li>
    {user &&
    <li>
      <i class="fas fa-sign-out-alt" onClick={() => logOut()}></i>
    </li>}
  </ul>
  );
}

export default NavBar;
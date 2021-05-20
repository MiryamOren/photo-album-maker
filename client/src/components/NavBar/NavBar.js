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
function NavBar() {
  return (
    <ul className="NavBar">
    <li>
      <Link to="/">
        <img src="./static/logo.png" alt=""/>
      </Link>
    </li>
  </ul>
  );
}

export default NavBar;
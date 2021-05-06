/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import axios from "axios";
import Redirect from './pages/redirect/redirect'
import Home from './pages/home/home'
function App() {
  console.log('push to git ')
  const APIpath = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';
  const [dataFromServer, setDataFromServer] = useState('')
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log(user)
    const getDataFromServer = async () => {
      try {
        const getRes = await axios.get(APIpath)
        setDataFromServer(getRes.data);
        console.log(getRes.data)
      } catch(e){
        console.log(e)
      }
    }
    getDataFromServer();
  }, [])
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>
        {dataFromServer}
        <Switch>
          <Route exact path="/">
            <Redirect
              condition={user}
              component={<Home user={user} APIpath={APIpath}/>}
              APIpath={APIpath}
              user={user}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  ); 

}

export default App;

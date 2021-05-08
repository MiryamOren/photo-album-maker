/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory
} from "react-router-dom";
import axios from "axios";
import Redirect from './pages/redirect/redirect'
import Home from './pages/home/home'
import AlbumPage from './pages/album_page/albumPage'
function App() {
  const APIpath = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';
  const [dataFromServer, setDataFromServer] = useState('')
  const [user, setUser] = useState(null);
  const [albumPath, setAlbumPath] = useState('')
  console.log(albumPath)
  // const { location } = useHistory();
  // console.log(location);
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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
        </ul>
        {dataFromServer}
        <Switch>
          <Route exact path="/">
            <Redirect
              component={<Home user={user} APIpath={APIpath} setAlbumPath={setAlbumPath}/>}
              APIpath={APIpath}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
          <Route path="/albums" exact>
            <Redirect
              component={<AlbumPage user={user} APIpath={APIpath}/>}
              APIpath={APIpath}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  ); 

}

export default App;

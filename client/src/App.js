/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
import Albums from './pages/albums/albums'
// import DragAndDrop from './components/test'
import DragThingsToBoxesDemo from './DnD/DragThingsToBoxesDemo'
import EditPhotoBook from './pages/edit_photo_book/editPhotoBook'
function App() {
  const APIpath = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';
  const [user, setUser] = useState(null);
  const [render, SetRender] = useState(false)
  
  const getUser = async () => {
    console.log('refresh user data. user:')
    try {
      const token = await localStorage.getItem("token");
      SetRender(true);
      const res = await axios.get( APIpath + '/users/user',
        {headers: { 'Authorization': `Bearer ${token}` }});
      
      setUser(res.data);
      console.log(res.data);
    } catch(e){
      console.log(e)
      setUser(null);
    }
  }
  useEffect(() => {    
    getUser()
  }, [])

  return (
    <Router>
      {render? 
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/albums">Albums</Link>
          </li>
          <li>
            <Link to="/drag-and-drop">Drag And Drop</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Redirect
              component={<Home user={user} APIpath={APIpath} refreshFunc={getUser}/>}
              APIpath={APIpath}
              user={user}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
          <Route path="/albums" exact>
            <Redirect
              component={<Albums user={user} APIpath={APIpath}/>}
              APIpath={APIpath}
              user={user}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
          <Route path="/:userName/albums/:albumName" exact >
            <Redirect
              component={<AlbumPage user={user} APIpath={APIpath} refreshFunc={getUser}s/>}
              APIpath={APIpath}
              user={user}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
          <Route path="/:userName/edit-photo-book/:albumName/:template" exact >
            <Redirect
              component={<EditPhotoBook user={user} APIpath={APIpath}/>}
              APIpath={APIpath}
              user={user}
              setUserFunc={(user) => setUser(user)}
            />
          </Route>
          <Route path="/drag-and-drop" exact >
            <DragThingsToBoxesDemo />
          </Route>
        </Switch>
      </div> : null }
    </Router> 
  ); 

}

export default App;

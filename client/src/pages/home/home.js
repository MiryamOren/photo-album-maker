/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import axios from 'axios';
import UploadImages from '../../components/upload_images/uploadImages';
import ImageGallery from '../../components/image_gallery/imageGallery';

function Home({user, APIpath, setAlbumPath}) {
  const [imagesArr, SetImagesArr] = useState([]);
  const [newImage, SetNewImage] = useState(false);
  const [albumsList, setAlbumsList] = useState('');
  console.log(user)
  useEffect(() => {
    const getUser = async() => {
      const token = await localStorage.getItem("token");
      const res = await axios.get( APIpath + '/users/user',
        {headers: { 'Authorization': `Bearer ${token}` }});
      SetImagesArr(res.data.images)
      setAlbumsList(res.data.albumsNames[0])
      setAlbumPath(res.data.albumsNames[0])
    }
    getUser();
  }, [newImage])
  return(
    <div>
      <UploadImages user={user} reRender={() => SetNewImage(!newImage)} APIpath={APIpath}/>
      <ImageGallery imagesArr={imagesArr} APIpath={APIpath}/>
    </div>
  )
}

export default Home;
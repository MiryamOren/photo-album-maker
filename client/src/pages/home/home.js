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

function Home({ APIpath, user, refreshFunc }) {
  const imagesArr = user.images;
  // const [newImage, SetNewImage] = useState(false);
  const albumsList = user.albumsNames;

  console.log(user)

  const renderAlbumsLinks = () => {
    if (!user) {return null}
    return (
        <ul>
          {albumsList.map(album => <li key={album}><Link to={`/${user.userName}/albums/${album}`}>{album}</Link></li>)}
        </ul>
    )
  }
  return(
    <div>
      <UploadImages user={user} reRender={refreshFunc} APIpath={APIpath}/>
      <ImageGallery imagesArr={imagesArr} APIpath={APIpath}/>
      {renderAlbumsLinks()}
    </div>
  )
}

export default Home;
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import UploadImages from '../../components/upload_images/uploadImages';
import ImageGallery from '../../components/image_gallery/imageGallery';
import UpdateImageAlbumsForm from '../../components/update_image_albums_form/updateImageAlbumsForm'
import './home.css'
function Home({ APIpath, user, updateUser }) {
  const imagesArr = user.images;
  const albumsList = user.albumsNames;
  const [editFormProps, setEditFormProps] = useState(null)

  console.log(user)

  const renderAlbumsLinks = () => {
    if (!user) {return null}
    return (
        <ul className="home_albums-list">
          {albumsList.map(album => <li key={album}><Link to={`/${user.userName}/albums/${album}`}>{album}</Link></li>)}
        </ul>
    )
  }
  return(
    <div className="home page">
      <h1>{user.name}</h1>
      <div className="home_main">
        <ImageGallery className="home_image-gallery" imagesArr={imagesArr} updateUser={updateUser} APIpath={APIpath}/>
        <div className="home_aside">
          <UploadImages user={user} updateUser={updateUser} APIpath={APIpath}/>
          {renderAlbumsLinks()}
        </div>
      </div>
    </div>
  )
}

export default Home;
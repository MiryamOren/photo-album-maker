import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from 'axios';
import ImageGallery from '../../components/image_gallery/imageGallery'

const AlbumPage = ({user, APIpath}) => {
  const {userName, albumName} = useParams();
  const imagesArr = user.images.filter(image => image.albumsNames.includes(albumName));

  
  const renderGallery = () => {
    return <ImageGallery imagesArr={imagesArr} APIpath={APIpath}/>
  }
  return(
    <div>
      <Link to={`/${user.userName}/edit-photo-book/${albumName}/template0`}>{`edit ${albumName} photo-book`}</Link>
      {renderGallery()}
    </div>
  )
}
export default AlbumPage;
import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom";
import { useLocation, useParams } from "react-router-dom";
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
      
      {renderGallery()}
    </div>
  )
}
export default AlbumPage;
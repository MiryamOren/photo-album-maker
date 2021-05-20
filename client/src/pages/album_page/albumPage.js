import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from 'axios';
import ImageGallery from '../../components/image_gallery/imageGallery'
import './albumPage.css'
const AlbumPage = ({user, APIpath}) => {
  const {userName, albumName} = useParams();
  const imagesArr = user.images.filter(image => image.albumsNames.includes(albumName));

  
  const renderGallery = () => {
    return <ImageGallery imagesArr={imagesArr} APIpath={APIpath}/>
  }
  return(
    <div className="album-page page">
      <h1>{albumName}</h1>
      <Link className="album-page_link" to={`/${user.userName}/edit-photo-book/${albumName}/template0`}>
      {/*`edit ${albumName} photo-book`*/}
      <span className="album-page_link_images-icon"><i className="fas fa-images"></i></span>
      <span className="album-page_link_pencil-icon"><i className="fas fa-pencil-alt"></i></span>
      </Link>
      {renderGallery()}
    </div>
  )
}
export default AlbumPage;
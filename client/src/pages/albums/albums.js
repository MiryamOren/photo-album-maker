import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ImageGallery from '../../components/image_gallery/imageGallery'

function Albums({APIpath, user}) {
  // const [imagesArr, SetImagesArr] = useState([]);
  // const [albumsList, setAlbumsList] = useState([]);
  // const [currentAlbum, setCurrentAlbum] = useState('')
  const imagesArr = user.images;
  const albumsList = user.albumsNames;
  const [currentAlbum, setCurrentAlbum] = useState(user.albumsNames[0]);
  // useEffect(() => {
  //   const getUser = async() => {
  //     const token = await localStorage.getItem("token");
  //     const res = await axios.get( APIpath + '/users/user',
  //       {headers: { 'Authorization': `Bearer ${token}` }});
  //     SetImagesArr(res.data.images)
  //     setAlbumsList(res.data.albumsNames)
  //     setCurrentAlbum(res.data.albumsNames[0])
  //   }
  //   getUser();
  // }, []);

  const renderAlbumsList = () => {
    return (
      <ul>
        {albumsList.map(album => <li key={album} onClick={() => setCurrentAlbum(album)}>{album}</li>)}
      </ul>
    )
  }
  const renderGallery = () => {
    const currentImagesArr = imagesArr.filter(image => image.albumsNames.includes(currentAlbum));
    return <ImageGallery imagesArr={currentImagesArr} APIpath={APIpath}/>
  }
  return(
    <div>
      {renderAlbumsList()}
      {renderGallery()}
      
    </div>
  )
}
export default Albums;
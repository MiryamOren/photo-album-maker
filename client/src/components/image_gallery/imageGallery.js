import React, { useState, useEffect } from "react"
import axios from 'axios';
import ImageCard from '../image_card/imageCard'
import UpdateImageAlbumsForm from '../update_image_albums_form/updateImageAlbumsForm'
import './imageGallery.css'
function ImageGallery({imagesArr, APIpath}) {
  const [userToUpdate, setUserToUpdate] = useState(null)
  const deleteImage = async(imageID) => {
    const token = await localStorage.getItem("token");
    const res = await axios.patch( APIpath + '/images/delete', { imageID },
      {headers: { 'Authorization': `Bearer ${token}` }});
  }
  const putAlbums = async(albums) => {
    console.log(albums)
    if (albums === 'cancel') { 
      setUserToUpdate(null);
      return;
    };
    const token = await localStorage.getItem("token");
    const imageID = userToUpdate.imageID;
    const res = await axios.patch( APIpath + '/images/put-image-albums-names', { imageID, albumNames: albums },
      {headers: { 'Authorization': `Bearer ${token}` }});
    setUserToUpdate(null);
  }
  const renderImages = () => {
    return (
      <div className="image-gallery">
        {imagesArr.map((img, indx) => {
          const imgBuffer = Buffer.from(img.content.data).toString('base64');
          const src = `data: image/jpeg;base64,${imgBuffer}`;
          return <ImageCard imageSrc={src} imageId={img._id} deleteFunc={deleteImage} editFunc={setUserToUpdate} key={indx} albums={img.albumsNames} indx={indx}/>
        })}
      </div>
    ) 
  }
  return(
    <div>
      {imagesArr && renderImages()}
      {userToUpdate && <UpdateImageAlbumsForm currentAlbums={userToUpdate.albums} putAlbumsFunc={putAlbums}/>}
    </div>
  )
}

export default ImageGallery;
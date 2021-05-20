import React, { useState, useEffect } from "react"
import InputWithLabale from '../input_with_labal/inputWithLabel'
import './updateImageAlbumsForm.css'

function UpdateImageAlbumsForm({currentAlbums, putAlbumsFunc, imageID, imageSrc}) {
  console.log('in UpdateImageAlbumsForm. imageSrc is:' )
  console.log(imageSrc)
  const [albums, setAlbums] = useState(currentAlbums);
  const [newAlbum, setNewAlbum] = useState('');
  const renderCurrentAlbums = () => {
    return (
      <ul>
        {albums.map(album => {
          return (
            <li key={album}>
              {album}
              <button 
                onClick={() => {
                  const temp = albums.filter(el => el !== album)
                  setAlbums(temp)}}
              ><i class="fas fa-trash"></i></button>
            </li>
          )})}
      </ul>
    )
  }
  return(
    <div className="update-image-albums-form-wrapper">
      <div className="update-image-albums-form">
        <img src={imageSrc} alt=""/>

        <div className="update-image-albums-form_albums">
          <div className="update-image-albums-form_current-albums">
            <label>Albums</label>
            {renderCurrentAlbums()}
          </div>

          <div className="update-image-albums-form_new-album">
            <InputWithLabale label="New Album" inputType="text" callback={setNewAlbum}/>
            <button onClick={() => {
              if (newAlbum) {
                console.log(newAlbum)
                console.log(albums)
                const temp = albums;
                temp.push(newAlbum);
                console.log(temp)
                setAlbums(Array.from(new Set(temp)));
              }
            }}
            ><i class="fas fa-plus-circle"></i></button>
          </div>
        </div>
        
        <div className="update-image-albums-form_btns">
          <button className="circ-btn" onClick={() => putAlbumsFunc({albums, imageID})}>confirm</button>
          <button className="circ-btn" onClick={() => putAlbumsFunc('cancel')}>cancel</button>
        </div>
      </div>
    </div>
  )
}
export default UpdateImageAlbumsForm;
import React, { useState, useEffect } from "react"
import InputWithLabale from '../input_with_labal/inputWithLabel'

function UpdateImageAlbumsForm({currentAlbums, putAlbumsFunc, imageID}) {
  console.log('in UpdateImageAlbumsForm. imageID is:' )
  console.log(imageID)
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
              >delete</button>
            </li>
          )})}
      </ul>
    )
  }
  return(
    <div>
      {renderCurrentAlbums()}
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
      >add</button>
      <button onClick={() => putAlbumsFunc({albums, imageID})}>confirm</button>
      <button onClick={() => putAlbumsFunc('cancel')}>cancel</button>
    </div>
  )
}
export default UpdateImageAlbumsForm;
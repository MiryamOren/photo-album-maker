import React, { useState, useEffect } from "react"

function ImageCard({imageSrc, imageID, deleteFunc, editFunc, indx, albums}) {
  return (
    <div>
      <ul>
        {albums.map(album => <li key={album}>{album}</li>)}
      </ul>
      <img src={imageSrc} alt=""/>
      <div>
        <button onClick={() => {
          console.log({imageID, albums})
          editFunc({imageID, albums})}}
        >edit</button>
        <button onClick={() => deleteFunc(imageID)}>delete</button>
        {indx}
      </div>
    </div>
  )
}
export default ImageCard;
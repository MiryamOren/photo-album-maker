import React, { useState, useEffect } from "react"

function ImageCard({imageSrc, imageId, deleteFunc, editFunc, indx, albums}) {
  return (
    <div>
      <ul>
        {albums.map(album => <li key={album}>{album}</li>)}
      </ul>
      <img src={imageSrc} alt=""/>
      <div>
        <button onClick={() => {
          console.log({imageId, albums})
          editFunc({imageId, albums})}}
        >edit</button>
        <button onClick={() => deleteFunc(imageId)}>delete</button>
        {indx}
      </div>
    </div>
  )
}
export default ImageCard;
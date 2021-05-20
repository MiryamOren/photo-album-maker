import React, { useState, useEffect } from "react"
import './imageCard.css'
function ImageCard({imageSrc, imageID, deleteFunc, editFunc, indx, albums}) {
  return (
    <div className="image-card">
      <img src={imageSrc} alt=""/>
      <div className="image-card_hover">
        <ul className="image-card_albums">
          {albums.map(album => <li key={album}>{album}</li>)}
        </ul>
        <div className="image-card_btns">
          <button onClick={() => {
            console.log({imageID, albums})
            editFunc({imageID, albums, imageSrc})}}
          ><i className="fas fa-pen"></i></button>
          <button onClick={() => deleteFunc(imageID)}><i className="fas fa-trash"></i></button>
        </div>
      </div>
      
    </div>
  )
}
export default ImageCard;
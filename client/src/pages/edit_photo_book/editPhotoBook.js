import React, { useState, useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import DnDBox from '../../components/DnD_Box/DnDBox'
import Template1 from '../../collage_templates/template1/template1'
function EditPhotoBook({user, APIpath}) {
  const reference = useRef(null);
  const templates = {
    template0: <Template1 ref={el => (reference.current = el)}/>
  }
  const {userName, albumName, template } = useParams();

  const imagesArr = user.images
    .filter(image => image.albumsNames.includes(albumName))
    .map( image => `data: image/jpeg;base64,${Buffer.from(image.content.data).toString('base64')}`);

  return(
    <div>
      <DnDBox 
        boxablesArr={imagesArr} targetKey="box" name="box"
      />
      {templates[template]}
      <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => reference.current}
        />
    </div>
  )
}
export default EditPhotoBook;
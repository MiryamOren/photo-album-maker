import React, { useState, useEffect, useRef } from "react"
import { useLocation, useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import DnDBox from '../../components/DnD_Box/DnDBox'
import Template1 from '../../collage_templates/template1/template1'
import './editPhotoBook.css'
function EditPhotoBook({user, APIpath}) {
  // const reference = useRef(null);
  const {userName, albumName, template } = useParams();
  const templates = {
    template0: <Template1 APIpath={APIpath} albumName={albumName} />
  }
  const templatesArr = [Template1, ]

  const imagesArr = user.images
    .filter(image => image.albumsNames.includes(albumName))
    .map( image => {
      return {
        imageSrc : `data: image/jpeg;base64,${Buffer.from(image.content.data).toString('base64')}`,
        imageID : image._id
       }
    });

  const renderExistingCollages = () => {
    return (user.collages
      .filter(collage => collage.albumName && collage.imagesPositions.find(el => el))
      .map(collage => {
        const Template = templatesArr[collage.template];
        return (
          <React.Fragment>
            <DnDBox 
              boxablesArr={imagesArr} targetKey="box" name="box" className="edit-photo-book_DnD-box"
            />
            <Template APIpath={APIpath} albumName={albumName} imagesPositions={collage.imagesPositions} imagesArr={imagesArr} collageId={collage._id}/>
          </React.Fragment>
        )
      }))
  }
  return(
    <div className="edit-photo-book page">
      <h2>Create New Collage</h2>
      <DnDBox 
        boxablesArr={imagesArr} targetKey="box" name="box" className="edit-photo-book_DnD-box"
      />
      {templates[template]}
      {renderExistingCollages().length ? <h2>Edit Existing Collages</h2> : null}
      {renderExistingCollages()}
    </div>
  )
}
export default EditPhotoBook;
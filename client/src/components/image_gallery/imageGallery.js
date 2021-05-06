import React, { useState, useEffect } from "react"
function ImageGallery({buffersArr}) {
  const renderImages = () => {
    return (
      <React.Fragment>
        {buffersArr.map((buffer, indx) => {
          const src = Buffer.from(buffer.content.data).toString('base64')
          return <img src={`data: image/jpeg;base64,${src}`} alt="txt" key={indx}/>
        })}
      </React.Fragment>
    ) 
  }
  return(
    <div>
      {renderImages()}
    </div>
  )
}

export default ImageGallery;
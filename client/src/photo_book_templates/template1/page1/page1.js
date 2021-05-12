import React, { useState, useEffect } from "react"

function Template1Page1({imageSrc, albumName}) {
  return (
    <div>
      <img src={imageSrc} alt=""/>
      <div>{albumName}</div>
      <div>photo album</div>
    </div>
  )
}
export default Template1Page1;
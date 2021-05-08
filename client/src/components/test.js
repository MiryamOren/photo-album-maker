import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

function DisplayTxt({txt}) {
  const { location } = useHistory();
  console.log(location);
  const userName = location.pathname.split("/")[2];
  const albumName = location.pathname.split("/")[3];
  return(
    <div>{`hi! ${userName}, ${albumName}`}</div>
  )
}
export default DisplayTxt;
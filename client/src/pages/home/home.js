/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import axios from 'axios'
import UploadImages from '../../components/upload_images/uploadImages'
import ImageGallery from '../../components/image_gallery/imageGallery'
function Home({user, APIpath}) {
  const [buffersArr, SetBuffersArr] = useState([]);
  const [newImage, SetNewImage] = useState(false);
  console.log(user)
  useEffect(() => {
    const getUser = async() => {
      const body = {"userName": user.userName};
      const res = await axios.post( APIpath + '/users/user', body);
      console.log(body);
      console.log(res.data);
      SetBuffersArr(res.data.images)
    }
    getUser();
  }, [newImage])
  return(
    <div>
      <UploadImages user={user} reRender={() => SetNewImage(!newImage)} APIpath={APIpath}/>
      <ImageGallery buffersArr={buffersArr}/>
    </div>
  )
}

export default Home;
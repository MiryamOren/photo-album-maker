import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faImage } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const ReactUploadImage = ({user, reRender, APIpath})=>{
    const [image, setImage]= useState(null)
    
    const handleUpload= async () => {
        const formData = new FormData();
        formData.append('image',image);
        // formData.append('userName',user.userName);
        const token = await localStorage.getItem("token");
        const response= await axios.post(APIpath + '/images/upload', formData,
            {
            headers: {
                // userName: user.userName,
                'Authorization': `Bearer ${token}`,
                "content-type":
                "multipart/form-data; boundary=<calculated when request is sent>",
            },
            }
        );
        console.log(response)
        reRender()
    }
    return <div>
        <input onChange={(e)=>{
            setImage(e.target.files[0])
        }} type="file"/>
        <button onClick={handleUpload}>upload</button>
    </div>

}

export default ReactUploadImage

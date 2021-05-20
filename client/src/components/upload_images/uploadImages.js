import React, { useState, useEffect } from "react"
import axios from 'axios'
import './uploadImages.css'
const ReactUploadImage = ({user, updateUser, APIpath})=>{
    
    const handleUpload = async (image) => {
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
        updateUser(response.data)
    }
    return <div className="upload-image">
        <div className="upload-image_input-container">
            <span className="upload-image_input-container_img-icon"><i className="far fa-image"></i></span>
            <span className="upload-image_input-container_plus-icon"><i className="fas fa-plus-circle"></i></span>
            <input className="upload-image_input" onChange={(e)=> {
                handleUpload(e.target.files[0]);
            }} type="file"/>
        </div>
    </div>

}

export default ReactUploadImage

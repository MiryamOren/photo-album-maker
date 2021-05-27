import React, { useState, useEffect } from "react"
import axios from 'axios'
import * as tmImage from '@teachablemachine/image'
import './uploadImages.css'
const ReactUploadImage = ({user, updateUser, APIpath})=>{
    const [image, setImage] = useState(null) 
    const [msg, setMsg] = useState(null)
    const imageClassify = async (file) => {
        const URL = "https://teachablemachine.withgoogle.com/models/yU8JOOrbG/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        const model = await tmImage.load(modelURL, metadataURL);

        const image = document.getElementById('image');
        console.log(image);

        const prediction = await model.predictTopK(image, 3)
        console.log(prediction)
        const cats = prediction.find(el => el.className === "cats");
        (cats.probability <= 0.6) ? setMsg(`This site only supports uploading pictures of cats! Try uploading more appropriate images🐱`) : setMsg(null);
        console.log(cats.probability <= 0.6);
        if (cats.probability > 0.6) { handleUpload(file) }
    }
    const handleUpload = async (image) => {
        const formData = new FormData();
        formData.append('image',image);
        const token = await localStorage.getItem("token");
        const response= await axios.post(APIpath + '/images/upload', formData,
            {
            headers: {
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
            <input className="upload-image_input" onClick={() => setMsg(null)} onChange={(e)=> {
                setMsg(null)
                setImage(URL.createObjectURL(e.target.files[0]));
                const cat = imageClassify(e.target.files[0]);
                console.log('cat')
                console.log(cat)
                
            }} type="file"/>
        </div>
        {image && <img className="upload-image_preview-img" src={image} alt="" id="image"/>}
        {msg && <p className="upload-image_msg">{msg}</p>}
    </div>

}

export default ReactUploadImage

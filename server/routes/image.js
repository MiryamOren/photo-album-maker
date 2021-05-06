const express = require('express')
const multer = require("multer");
const sharp = require('sharp');
const {
  addImage,
} = require('../utils/user');
const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpdeg|JPEG|png|PNG|jpeg)$/)) {
      return cb(new Error("File must be a JPG or PNG image"));
    }
    cb(undefined, true);
  },
});

router.post( "/api/images/upload", upload.single("image"), async (req, res) => {
  try{
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 150, height: 150 })
      .toBuffer();
    console.log(buffer)
    await addImage(req.body.userName, buffer)
    res.send(buffer);
  }catch(e){
    console.log(e)
  }
});
module.exports = router;
const express = require('express')
const sharp = require('sharp');
const auth = require('../middleware/authentication')
const upload = require('../middleware/multer');
const {
  addImage,
  addImageToAlbum,
  putImageAlbums,
  deleteImage,
} = require('../utils/image');
const { updateUserAlbums } = require('../utils/user');

// const User = require('../models/user');
// const { findOneAndUpdate } = require('../models/user');
const router = express.Router();

// >>>>>>>>>>>> Upload Image <<<<<<<<<<<<<< //
router.post("/api/images/upload", auth, upload.single("image"), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 150, height: 150 })
      .toBuffer();
    await addImage(req.user._id, buffer)
    res.send(buffer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// >>>>>>>>>>>> Get all user images <<<<<<<<<<<<<< //
router.get("/api/images/all", auth, async (req, res) => {
  try {
    res.status(200).send(req.user.images);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// >>>>>>>>>>>> Get images of spesific album <<<<<<<<<<<<<< //
router.get("/api/images/album/:albumName", auth, async (req, res) => {
  try {
    const images = req.user.images.filter(image => image.albumsNames.includes(req.params.albumName));
    console.log(images.length)
    res.status(200).send(images);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// >>>>>>>>>>>> Add a image to an album - add an album to the album array of the image <<<<<<<<<<<<<< //
router.patch("/api/images/add-image-to-album", auth, async (req, res) => {
  console.log(req.body)
  try {
    const user = addImageToAlbum(req.user._id ,req.body.imageID, req.body.albumName);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// >>>>>>>>>>>> Put Image AlbumsNames Array <<<<<<<<<<<<<< //
router.patch("/api/images/put-image-albums-names", auth, async (req, res) => {
  console.log(req.body)
  try {
    const user = await putImageAlbums(req.user._id ,req.body.imageID, req.body.albumNames);
    await updateUserAlbums(req.user._id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// >>>>>>>>>>>> Delete image <<<<<<<<<<<<<< //
router.patch("/api/images/delete", auth, async (req, res) => {
  try {
    const result = await deleteImage(req.user._id ,req.body.imageID)
    res.status(200).send(result);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.post("/api/try/:album", async (req, res) => {
  console.log(req.params.album)
  try {
    res.send(req.params.album)
  } catch (e) {
    res.status(400).send(e.message);
  }
})
module.exports = router;
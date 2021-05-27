const express = require('express')
const sharp = require('sharp');
const TeachableMachine = require("@sashido/teachablemachine-node");
const path = require('path');
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
    // const model = new TeachableMachine({
    //   modelUrl: "https://teachablemachine.withgoogle.com/models/yU8JOOrbG/"
    // });
    // const imageSrc = "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697"
    // const b = Buffer.from(req.file.buffer).toString('base64');
    // const src = `data:image/jpeg;base64,${b}`;
    // // console.log(src)
    // let url = new URL(src);
    // // console.log(url.toString())
    // console.log(path.join(__dirname, '../../images/cats/1.jpeg'))
    // const prediction = model.inference({
    //   imageUrl: req.file//Buffer.from(req.file.buffer).toString('base64'),
    // }).then((predictions) => {
    //   console.log('-----------predictions-----------')
    //   console.log(predictions);
    //   // return res.json(predictions);
    // }).catch((e) => {
    //   console.error(e);
    // })
    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 150, height: 150 })
      .toBuffer();
    const user = await addImage(req.user._id, buffer)
    res.send(user);
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
    console.log('in /api/images/put-image-albums-names user is:')
    console.log(user)
    const updatedUser = await updateUserAlbums(req.user._id);
    console.log('in /api/images/put-image-albums-names user updatedUser:')
    console.log(updatedUser)
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// >>>>>>>>>>>> Delete image <<<<<<<<<<<<<< //
router.patch("/api/images/delete", auth, async (req, res) => {
  try {
    const result = await deleteImage(req.user._id ,req.body.imageID)
    // res.status(200).send(result);
    const updatedUser = await updateUserAlbums(req.user._id);
    console.log('in /api/images/put-image-albums-names user updatedUser:')
    console.log(updatedUser)
    res.status(200).send(updatedUser);
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
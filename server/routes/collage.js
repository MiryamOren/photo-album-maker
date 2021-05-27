const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user')
const auth = require('../middleware/authentication')
const {
  createUser,
  getUser
} = require('../utils/user');

const router = new express.Router();

// >>>>>>>>>>>> Add New Collage <<<<<<<<<<<<<< //
router.post('/api/collages/add-new-collage', auth, async function (req, res) {
  try {
    console.log(req.body)
    const id = mongoose.Types.ObjectId();
    User.findOneAndUpdate(
      {_id : req.user._id}, 
      { $push: { collages: {...req.body, _id: id} } }, 
        (error, doc) => {
        if (error) {
          throw new Error(err);
        }
        if (doc) {
          // console.log(doc)
      }
    });
    res.status(201).send(id);
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message);
  }
});

// >>>>>>>>>>>> Update Collage <<<<<<<<<<<<<< //
router.patch('/api/collages/update-collage', auth, async function (req, res) {
  try {
    console.log(req.body)
    User.findOneAndUpdate(
      {_id : req.user._id, "collages._id" :req.body.collageId},
      { 
          "$set": {
              "collages.$.imagesPositions": req.body.imagesPositions
          }
      },
      function(err,doc) {
        console.log(doc)
      }
  );
    res.status(200).send();
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message);
  }
});

module.exports = router;
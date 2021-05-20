const User = require('../models/user');

const addImage = async (_id, imgBuffer) => {
  const image =  {content: imgBuffer}
  try{
    User.findOneAndUpdate({_id}, { $push: { images: image } }, (error, doc) => {
      if (error) {
        throw new Error(err);
      }
      if (doc) {
        console.log(doc)
      }
    });
    const updated = await User.findOne({_id}).exec();
    return updated;
  } catch (err) {
    throw new Error(err);
  }

};

const getAlbumImages = async (_id, albumName) => {
  const images = await User
  .find({_id})
  .populate({
    path: 'images',
    match: { age: { $gte: 18 }},
    select: 'name age -_id'
  })
  .exec()
}

const addImageToAlbum = async (userID ,imageID, albumName) => {
  try {
    const user = await User.updateOne(
      { 
          "_id": userID,
          "images._id" : imageID,
      },
      { 
          "$push": {
              "images.$.albumsNames" : albumName,
              
          }
      });
    if (!user) { throw new Error('user not found')};
    // return user;
    const updated = await User.findOne({_id : userId}).exec();
    return updated;

  } catch (err) {
    return err
  }
};

const putImageAlbums = async (userID ,imageID, albumsArr) => {
  try {
    const user = await User.updateOne(
      { 
          "_id": userID,
          "images._id" : imageID,
      },
      { 
          "$set": {
              "images.$.albumsNames" : albumsArr,
              
          }
      });
    if (!user) { throw new Error('user not found')};
    return user;

  } catch (err) {
    return err
  }
};


const deleteImage = async (userID ,imageID) => {
  try {
    const user = await User.updateOne(
      { 
          "_id": userID,
      },
      { 
          "$pull": {
              "images" : { "_id" : imageID },
          }
      });
    if (!user) { throw new Error('user not found')};
    const updated = await User.findById(userID)
    return updated;

  } catch (err) {
    return err
  }
}



module.exports = {
  addImage,
  getAlbumImages,
  addImageToAlbum,
  putImageAlbums,
  deleteImage,
};
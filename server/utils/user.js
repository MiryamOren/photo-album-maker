const User = require('../models/user');

const createUser = async (userObj) => {
  try {
    const user = await new User(userObj);
    await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
  } catch (err) {
    throw new Error(err);
  }
};

const getUser = async (userName) => {
  const user = await User.findOne({'userName': userName}, function(err,obj) {
      return obj 
    });
    return user;
}

const updateUserAlbums = async (userId) => {
  const res = await User.findById(userId, async function (err, doc) {
    if (err) {return err }
    const albums =  doc.images.reduce((userAlbums, image) => userAlbums.concat(image.albumsNames), []);
    doc.albumsNames = Array.from(new Set(albums));
    await doc.save();
    return doc;
  });
  const updated = await User.findOne({_id : userId}).exec();
  // console.log(updated)
  return updated;
  // return updated;
}

module.exports = {
  createUser,
  getUser,
  updateUserAlbums,
};
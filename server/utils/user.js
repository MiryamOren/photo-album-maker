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



const addImage = async(userName, imgBuffer) => {
  console.log('in utils addImage, user name is')
  console.log(userName)
  console.log('buffer is')
  console.log(imgBuffer)
  const image =  {content: imgBuffer}
  try{
    User.findOneAndUpdate({userName}, { $push: { images: image } }, (error, doc) => {
      if (error) {
        console.log(error)
      }
      if (doc) {

      }
      // error: any errors that occurred
      // doc: the document before updates are applied if `new: false`, or after updates if `new = true`
    });
  } catch (err) {
    throw new Error(err);
  }
}

const getUser = async (userName) => {
  const user = await User.findOne({'userName': userName}, function(err,obj) {
      return obj 
    });
    // console.log('user')
    // console.log(user)
    return user;
}

module.exports = {
  createUser,
  addImage,
  getUser
};
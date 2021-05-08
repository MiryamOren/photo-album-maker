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

module.exports = {
  createUser,
  getUser
};
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ImageSchema = new mongoose.Schema({
  content: {
    type: Buffer,
    required: true,
  },
  albumsNames: [{
    type: String
  }]
});

const CollageSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  template: {
    type: Number,
    required: true,
  },
  imagesPositions: [{
    type: String,
  }]
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    validate(value) {
      if (/\d/.test(value)) throw new Error("name mustn't include digits");
    },
  },
  userName: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
    validate(value) {
      if (/\d/.test(value)) throw new Error("name mustn't include digits");
    },
  },
  email: {
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('invalid email');
    },
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  images: [ImageSchema],
  albumsNames: [{
    type: String
  }],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  collages: [CollageSchema],
});

// hash the password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// find user by userName & validate the password
userSchema.statics.findByCredentials = async (userName, password) => {
  const user = await User.findOne({ userName });
  if (!user) {
      throw new Error('Unable to login1');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      throw new Error('Unable to login2');
  }
  return user;
}

// generate AuthToken
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'my-secret', { expiresIn: '1 day' })

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

const User = mongoose.model('User', userSchema);
module.exports = User;
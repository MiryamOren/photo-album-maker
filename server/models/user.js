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

  }]
})
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
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// hash the password
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// find user by email & validate the password
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
  const token = jwt.sign({ _id: user._id.toString() }, 'my-secret')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

// UserSchema.pre('save', async function (next) {
//   this.tokens.push(await jwt.sign({ id: this._id }, 'password'));
//   this.password = await bcrypt.hash(this.password, 7);
//   next();
// });
// UserSchema.methods.toJSON = function () {
//   //i wanted to copy this into copy of it,but it's only reference and if i delete password or tokens it won't delete
//   const allowedKeys = Object.keys(this._doc).filter(
//     (key) => key !== 'password' && key !== 'tokens'
//   );
//   let filterUser = {};
//   allowedKeys.forEach((key) => (filterUser[key] = this[key]));
//   return filterUser;
// };

const User = mongoose.model('User', userSchema);
module.exports = User;
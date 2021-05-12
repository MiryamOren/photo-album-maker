const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/authentication')
const {
  createUser,
  getUser
} = require('../utils/user');

const router = new express.Router();

// >>>>>>>>>>>> Log in <<<<<<<<<<<<<< //
router.post('/api/users/login', async (req, res) => {
  console.log(req.body);
	try {
		const user = await User.findByCredentials(req.body.userName, req.body.password);
    const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} 
	catch (e) {
    console.log(e.message)
		res.status(400).send(e);
	}
});
// >>>>>>>>>>>> Sign Up <<<<<<<<<<<<<< //
router.post('/api/users/sign-up', async function (req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// >>>>>>>>>>>> Get User <<<<<<<<<<<<<< //
router.get('/api/users/user', auth, async function (req, res) {
  try {
    res.status(201).send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/api/users/is-user', auth, async function (req, res) {
  try {
    res.status(201).send(true);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
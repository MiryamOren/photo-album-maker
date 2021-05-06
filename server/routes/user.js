const express = require('express');
const User = require('../models/user')
console.log('in user router')
const {
  createUser,
  getUser
} = require('../utils/user');
const router = new express.Router();

router.post('/api/users/login', async (req, res) => {
  console.log(req.body);
	try {
		const user = await User.findByCredentials(req.body.userName, req.body.password);
    const token = await user.generateAuthToken();
    console.log({ user, token });
		res.status(200).send({ user, token });
	} 
	catch (e) {
    console.log(e.message)
		res.status(400).send(e);
	}
});
router.post('/api/users/sign-up', async function (req, res) {
  console.log(req.body);
  try {
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/api/users/user', async function (req, res) {
  try {
    const user = await getUser(req.body.userName)
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
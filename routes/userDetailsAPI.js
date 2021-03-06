const express = require('express');
const passport = require('passport');

const router = express.Router();


const User = require('../models/UserDetailsSchema');

router.get('/usersDetails',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const usersDetails = await User.find();
  res.json(usersDetails);
});

router.get('/usersDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const userId = await User.findById(req.params.id);
  res.json(userId);
});

router.post('/usersDetails',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const createdUser = await User.create(req.body);
  res.json(createdUser);
});

router.put('/usersDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updateUser);
});

router.delete('/usersDetails/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

module.exports = router;
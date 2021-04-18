const express = require('express');
const passport = require('passport');
const router = express.Router();

const toturiol = require('../models/tutorialSchem');

router.get('/toturiols', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const toturiols = await toturiol.find();
  res.json(toturiols);
});

router.get('/toturiols/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const toturiolId = await toturiol.findById(req.params.id);
  res.json(toturiolId);
});

router.post('/toturiols', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const createdtoturiol = await toturiol.create(req.body);
  res.json(createdtoturiol);
});

router.put('/toturiols/:id',  passport.authenticate('bearer', { session: false }),async (req, res) => {
  const updatetoturiol = await toturiol.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatetoturiol);
});

router.delete('/toturiols/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const deletetoturiol = await toturiol.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

module.exports = router;
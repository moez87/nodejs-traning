const express = require('express');
const passport = require('passport');

const router = express.Router();

const tag = require('../models/tagSchema');

router.get('/tags', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const tags = await tag.find().populate('tutorials');
  res.json(tags);
});

router.get('/tags/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const tagId = await tag.findById(req.params.id);
  res.json(tagId);
});

router.post('/tags', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const createdtag = await tag.create(req.body);
  res.json(createdtag);
});

router.put('/tags/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const updatetag = await tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatetag);
});

router.delete('/tags/:id', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const deletetag = await tag.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

router.put('/tags/affectTutoliors/:idTag/:idTuto',  passport.authenticate('bearer', { session: false }),async(req,res)=>{
  const updatedTag = await tag.findByIdAndUpdate(req.params.idTag,{$push:{tutorials: req.params.idTuto}},{new :true})
  res.json({message: 'Tutorial affected succussefuly '});
});
router.put('/tags/disaffectTutoliors/:idTag/:idTuto',  passport.authenticate('bearer', { session: false }),async(req,res)=>{
  const updatedTag = await tag.findByIdAndUpdate(req.params.idTag,{$pull:{tutorials: req.params.idTuto}},{new :true})
  res.json({message: 'Tutorial disaffected succussefuly '});
});

module.exports = router;
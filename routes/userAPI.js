const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userSchema');

router.get('/users', passport.authenticate('bearer', { session: false }),async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/users/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const userId = await User.findById(req.params.id);
  res.json(userId);
});

router.post('/users', passport.authenticate('bearer', { session: false }),async (req, res) => {
  const createdUser = await User.create(req.body);
  res.json(createdUser);
});

router.put('/users/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updateUser);
});

router.delete('/users/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

//6. filter
router.get('/users/filter/gtage', async (req, res) => {
  const users = await User.find({ "age": { $gt: 24 } });
  res.json(users)
})
router.get('/users/filter/ltage', async (req, res) => {
  const users = await User.find({ "age": { $lt: 25 } });
  res.json(users)
})
router.get('/users/filter/orage', async (req, res) => {
  const users = await User.find().or([{ age: 25 }, { age: 24 }]);
  res.json(users)
})
router.get('/users/filter/andage', async (req, res) => {
  const users = await User.find().and([{ firstName: 'Moez' }, { age: 33 }]);
  res.json(users)
})

router.put('/users/affectTodo/:idUser/:idTodo',passport.authenticate('bearer', { session: false }), async(req,res)=>{
  const updatedUser = await User.findByIdAndUpdate(req.params.idUser,{$push:{todos: req.params.idTodo}},{new :true})
  res.json({message: 'Todo affected succussefuly '});
});

router.put('/users/disaffectTodo/:idUser/:idTodo',passport.authenticate('bearer', { session: false }), async(req,res)=>{
  const updatedUser = await User.findByIdAndUpdate(req.params.idUser,{$pull:{todos: req.params.idTodo}},{new :true})
  res.json({message: 'Todo disaffected succussefuly '});
});


router.put('/users/affectDetails/:idUser/:idUserDetails',passport.authenticate('bearer', { session: false }), async(req,res)=>{
  const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {usersDetails:req.params.idUserDetails },{new :true})
  res.json({message: 'UserDetails affected succussefuly '});
});

module.exports = router;
const express = require('express');
const passport = require('passport');
const router = express.Router();

const Todo = require('../models/todoShema');

router.get('/todos', passport.authenticate('bearer', { session: false }), async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.get('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const todoId = await Todo.findById(req.params.id);
  res.json(todoId);
});

router.post('/todos',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const createdTodo = await Todo.create(req.body);
  res.json(createdTodo);
});

router.put('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updateTodo);
});

router.delete('/todos/:id',passport.authenticate('bearer', { session: false }), async (req, res) => {
  const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

module.exports = router;
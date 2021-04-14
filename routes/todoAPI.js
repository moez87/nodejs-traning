const express = require('express');
const router = express.Router();

const Todo = require('../models/todoShema');

router.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

router.get('/todos/:id', async (req, res) => {
  const todoId = await Todo.findById(req.params.id);
  res.json(todoId);
});

router.post('/todos', async (req, res) => {
  const createdTodo = await Todo.create(req.body);
  res.json(createdTodo);
});

router.put('/todos/:id', async (req, res) => {
  const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updateTodo);
});

router.delete('/todos/:id', async (req, res) => {
  const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json("{'delete seccussefuly'}");
});

module.exports = router;
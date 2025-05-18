// Routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById } = require('../Services/userService');

router.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).send({ error: 'Name and email required' });

  const user = createUser(name, email);
  res.status(201).send(user);
});

router.get('/users', (req, res) => {
  res.send(getAllUsers());
});

router.get('/users/:id', (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).send({ error: 'User not found' });
  res.send(user);
});

module.exports = router;

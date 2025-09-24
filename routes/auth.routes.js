const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const router = express.Router();

// POST /signup
router.post('/signup', async (req, res) => {
  const check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: 'existing user found with the same email',
    });
  }
  const cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    cartData: cart,
  });
  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

// POST /login
router.post('/login', async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) {
    return res.json({ success: false, errors: 'You have to Sign Up first!' });
  }
  const passcompare = req.body.password === user.password; // plaintext as in your code
  if (!passcompare) {
    return res.json({ success: false, errors: 'Your password is incorrect' });
  }
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, 'secret_ecom');
  return res.json({ success: true, token });
});

module.exports = router;

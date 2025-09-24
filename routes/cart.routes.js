const express = require('express');
const Users = require('../models/User');
const fetch = require('../middleware/auth');

const router = express.Router();

// POST /getcart
router.post('/getcart', fetch, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ errors: 'User not found' });
    return res.json(user.cartData || {});
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: 'server error' });
  }
});

// POST /addtocart
router.post('/addtocart', fetch, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (itemId === undefined)
      return res.status(400).json({ errors: 'itemId is required' });

    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ errors: 'User not found' });

    if (typeof user.cartData[itemId] !== 'number') user.cartData[itemId] = 0;
    user.cartData[itemId] += 1;

    await Users.findByIdAndUpdate(req.user.id, { cartData: user.cartData });
    return res.send('Added');
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: 'server error' });
  }
});

// POST /removeFromCart
router.post('/removeFromCart', fetch, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (itemId === undefined)
      return res.status(400).json({ errors: 'itemId is required' });

    const user = await Users.findById(req.user.id);
    if (!user) return res.status(404).json({ errors: 'User not found' });

    if (
      typeof user.cartData[itemId] === 'number' &&
      user.cartData[itemId] > 0
    ) {
      user.cartData[itemId] -= 1;
    } else {
      user.cartData[itemId] = 0;
    }

    await Users.findByIdAndUpdate(req.user.id, { cartData: user.cartData });
    return res.send('Removed');
  } catch (e) {
    console.error(e);
    return res.status(500).json({ errors: 'server error' });
  }
});

module.exports = router;

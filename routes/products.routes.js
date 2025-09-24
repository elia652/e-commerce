const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// POST /addproduct
router.post('/addproduct', async (req, res) => {
  const products = await Product.find({});
  let id;
  if (products.length > 0) {
    const last_product = products[products.length - 1];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();

  res.json({ success: 1, name: req.body.name });
});

// POST /removeProduct
router.post('/removeProduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: 1, name: req.body.name });
});

// GET /getProduct
router.get('/getProduct', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// GET /newcollection
router.get('/newcollection', async (req, res) => {
  const products = await Product.find({});
  const newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

// GET /popular
router.get('/popular', async (req, res) => {
  const popular = await Product.find({ category: 'women' });
  const popular_in_women = popular.slice(0, 4);
  res.send(popular_in_women);
});

module.exports = router;

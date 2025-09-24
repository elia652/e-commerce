const port = 4000;
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [/^http:\/\/localhost:3000$/, /^http:\/\/localhost:5173$/],
    credentials: true,
  })
);

// DB
connectDB();

// Static for images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// Health
app.get('/', (req, res) => {
  res.send('Express app is running');
});

// Routes
app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(uploadRoutes);

// Start server
app.listen(port, (error) => {
  if (!error) console.log('Server is running on Port', port);
  else console.log('error:', error);
});

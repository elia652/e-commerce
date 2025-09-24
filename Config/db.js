const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri =
    'mongodb+srv://elia:elia123456@cluster0.ajxtok9.mongodb.net/project';
  mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    });
};

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer storage (same as before)
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'upload/images'),
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// POST /upload
router.post('/upload', upload.single('product'), (req, res) => {
  return res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

module.exports = router;

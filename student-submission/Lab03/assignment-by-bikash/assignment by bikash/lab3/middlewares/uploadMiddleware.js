const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix); 
  }
});

// Create a multer upload instance
const upload = multer({ storage: storage });

// Middleware function for file upload
const uploadMiddleware = upload.single('image');

module.exports = uploadMiddleware;
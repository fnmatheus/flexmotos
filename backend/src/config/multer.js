const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${req.body.name}` + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 8000000
  }
});

module.exports = upload;
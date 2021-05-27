const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpdeg|JPEG|png|PNG|jpeg|jfif)$/)) {
      return cb(new Error("File must be a JPG or PNG image"));
    }
    cb(undefined, true);
  },
});

module.exports = upload
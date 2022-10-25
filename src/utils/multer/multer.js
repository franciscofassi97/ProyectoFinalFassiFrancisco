const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "fotoUrlProducto") {
      cb(null, './public/uploads')
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "fotoUrlProducto") {
      cb(null, file.fieldname + Date.now() + file.originalname);
    }
  },
});

const uploads = multer({ storage: storage });

module.exports = uploads;
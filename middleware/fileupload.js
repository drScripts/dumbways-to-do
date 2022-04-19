const multer = require("multer");
const path = require("path");
const { maxFileSize } = require("../config");

module.exports = (requestName, folderName = "users", required = false) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = path.join(__dirname, `../public/images/${folderName}`);
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname == requestName) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        req.fileValidationError = {
          message: "Please upload the valid image file",
        };
        return cb(new Error("Please upload the valid image file", false));
      }
    }

    cb(null, true);
  };

  const fileSize = parseInt(maxFileSize) || 2;
  const fileSizeByte = fileSize * 1000 * 1000;

  const upload = multer({
    fileFilter,
    storage,
    limits: {
      fileSize: fileSizeByte,
    },
  }).single(requestName);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError)
        return res.status(400).json({
          status: "error",
          message: req.fileValidationError.message,
        });

      if (required) {
        if (!req.file && !err)
          return res.status(400).json({
            status: "error",
            message: "Please upload file image",
          });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE")
          return res.status(400).json({
            status: "error",
            message: `File image max size is ${fileSize} MB!`,
          });

        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      }

      next();
    });
  };
};

const multer = require("multer");
const Datauri = require("datauri");
const path = require("path");
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single("image");
const dUri = new Datauri();
const dataUri = (req) => {
  // Check if req.file exists and has originalname property
  if (req.file && req.file.originalname) {
    const dUri = new Datauri();
    return dUri.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    );
  } else {
    throw new Error("File information is missing.");
  }
};
module.exports = { multerUploads, dataUri };

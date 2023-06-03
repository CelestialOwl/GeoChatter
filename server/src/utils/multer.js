import multer from "multer";
import path from "path";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // console.log("user file", file);
    let ext = file.mimetype.split("/");
    ext = ext[ext.length - 1];
    cb(null, file.originalname + "." + ext);
  },
});

export var upload = multer({ storage });

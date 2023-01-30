import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { upload } from "../utils/multer.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
console.log(path.dirname(fileURLToPath(import.meta.url)));
router.post("/edit-profile", upload.single("image"), async (req, res) => {
  console.log(req.file);
  var obj = {
    img: {
      data: fs.readFileSync(
        path.join(
          path.dirname(fileURLToPath(import.meta.url)) +
            "/uploads/" +
            "sarah.jpg"
        )
      ),
      contentType: "image/jpg",
    },
  };
  User.findOneAndUpdate({ email: "new" }, { img: obj }, (err) => {
    console.log("user error", err);
  });

  res.status(200).send({ msg: "success" });
});

export default router;

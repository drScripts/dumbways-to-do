const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/fileupload");
const auth = require("../middleware/auth");
const { register, login, profile, update } = require("../controllers/users");

router.post("/login", login);
router.post("/register", fileUpload("image", "users", false), register);
router.get("/users/profile", auth, profile);
router.patch(
  "/users/profile",
  [auth, fileUpload("image", "users", false)],
  update
);

module.exports = router;

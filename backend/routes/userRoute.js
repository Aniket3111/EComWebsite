const express= require("express");
const { registerUser, loginuser } = require("../controllers/UserController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
module.exports = router;
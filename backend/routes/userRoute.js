const express = require("express");
const {
  registerUser,
  loginuser,
  logout,
  forgetpassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getallusers,
  getsingleuser,
  updaterole,
  deleteuser,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgetpassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getallusers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getsingleuser)
  .put((isAuthenticatedUser, authorizeRoles("admin"), updaterole))
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteuser);
router
  .route("/admin/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getsingleuser);

module.exports = router;

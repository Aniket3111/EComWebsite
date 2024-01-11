const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getsingleorder,
  myorder,
  getallorders,
  updateorders,
  deleteorder,
} = require("../controllers/OrderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getsingleorder);
router.route("/orders/me").get(isAuthenticatedUser, myorder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getallorders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateorders)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteorder);

module.exports = router;

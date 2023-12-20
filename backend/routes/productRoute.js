const express= require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductdetails } = require("../controllers/ProductController");
const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/products/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductdetails)
module.exports = router

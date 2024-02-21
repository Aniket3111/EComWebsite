const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");

//create order
exports.newOrder = catchAsyncerrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
//get single order
exports.getsingleorder = catchAsyncerrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get logged in user orders
exports.myorder = catchAsyncerrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});
//get all orders -- admin
exports.getallorders = catchAsyncerrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalamount = 0;
  orders.forEach((order) => {
    totalamount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    orders,
    totalamount,
  });
});
// update order status--admin
exports.updateorders = catchAsyncerrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order.Orderstatus === "Delivered") {
    return next(new ErrorHandler("You have already Delivered this Order", 400));
  }
  order.OrderItem.forEach(async (o) => {
    await UpdateStock(o.product, o.quantity);
  });

  order.Orderstatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.delievereddat = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
async function UpdateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
exports.deleteorder = catchAsyncerrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});

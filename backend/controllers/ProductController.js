const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const Apifeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.getAllProducts = catchAsyncerrors(async (req, res) => {
  const resultperpage = 8;
  const productscount = await Product.countDocuments();
  const apifeatures = new Apifeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apifeatures.query;

  let filteredproductcount = products.length;

  apifeatures.pagination(resultperpage);
  products = await apifeatures.query.clone();
  res.status(200).json({
    success: true,
    products,
    productscount,
    resultperpage,
    filteredproductcount,
  });
});

//GET ALL PRODUCTS (admin)
exports.getAdminProducts = catchAsyncerrors(async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
// get product details

exports.getProductdetails = catchAsyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

exports.createProduct = catchAsyncerrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncerrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  // images start here
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    //deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete productt
exports.deleteProduct = catchAsyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  //deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
//create new review or update review
exports.createproductreview = catchAsyncerrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isreviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isreviewed) {
    product.reviews.forEach((rev) => {
      if ((rev) => rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numofreviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
exports.getproductreviews = catchAsyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
exports.deletereview = catchAsyncerrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() != req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numofreviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofreviews,
    },
    {
      new: true,
      runValidators: true,
      useFindandModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

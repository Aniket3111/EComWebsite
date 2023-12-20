
const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const Apifeatures = require("../utils/apifeatures");

exports.getAllProducts= catchAsyncerrors (async(req,res)=> {
const resultperpage = 5;
const productcount=await Product.countDocuments()
const apifeatures= new Apifeatures(Product.find(),req.query)
.search()
.filter()
.pagination(resultperpage)
    const product =  await apifeatures.query
     res.status(200).json({
     success:true,
     product
 })
});
// get product details

exports.getProductdetails = catchAsyncerrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product,
        productcount,
    })
});



exports.createProduct = catchAsyncerrors( async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

exports.updateProduct = catchAsyncerrors( async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found",404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindandModify:false});
    res.status(200).json({
        success:true, 
        product
    })
});

//delete productt
exports.deleteProduct = catchAsyncerrors( async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not found",404));
    }
    await product.remove()
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});
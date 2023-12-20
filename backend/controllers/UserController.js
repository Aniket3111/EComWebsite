const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");

const User = require("../models/usermodel");
const sendToken = require("../utils/jwtToken");

//register a user

exports.registerUser = catchAsyncerrors(async(req,res,next)=>{
    const {name,email,password} =req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is sample id",
            url: "profilepicurl",
        },
    });

    const token = user.getJWTToken();


  sendToken(user,201,res);
})

exports.loginuser = catchAsyncerrors (async (req,res,next)=>{
    const {email,password} = req.body;
    // checking if user has given both
    
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or Password"),401)
    }

    const isPasswordMatched = user.comparePassword();
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or Password"),401)
    }

    const token =  user.getJWTToken();


 sendToken(user,200,res);
})
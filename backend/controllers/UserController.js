const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const crypto = require("crypto");
const User = require("../models/usermodel");
const sendToken = require("../utils/jwtToken");
const error = require("../middleware/error");
const sendEmail = require("../utils/sendEmail");
const { errorMonitor } = require("events");
const cloudinary = require("cloudinary");
//register a user

exports.registerUser = catchAsyncerrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    createdAt,
  });

  sendToken(user, 201, res);
});

exports.loginuser = catchAsyncerrors(async (req, res, next) => {
  const { email, password } = req.body;
  // checking if user has given both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or Password"), 401);
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or Password", 401));
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncerrors(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.forgetpassword = catchAsyncerrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not Found", 404));
  }

  const resettoken = user.getResetpasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetpassworurl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resettoken}`;

  const message = `your password reset token is :- \n\n ${resetpassworurl}\n\n if you have not requested please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Eommerce password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `email is sent to ${user.email} succesfully`,
    });
  } catch {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncerrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await user.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password token is invalid or expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});
exports.updatePassword = catchAsyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = user.comparePassword(req.body.oldpassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect"), 400);
  }
  if (req.body.newpassword !== req.body.confirmpassword) {
    return next(new ErrorHandler("Password does not match"), 400);
  }
  user.password = req.body.newpassword;

  await user.save();
  sendToken(user, 200, res);
});
exports.updateProfile = catchAsyncerrors(async (req, res, next) => {
  const newuserdata = {
    name: req.body.name,
    email: req.body.email,
  };
  //we will  add cloudinary later
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageid = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageid);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newuserdata.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newuserdata, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
  });
});
// get all user details admin
exports.getallusers = catchAsyncerrors(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

//get single user(admin)
exports.getsingleuser = catchAsyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//update user role--Admin
exports.updaterole = catchAsyncerrors(async (req, res, next) => {
  const newuserdata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newuserdata, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });
  res.status(200).json({
    success: true,
  });
});
//delete user--Admin
exports.deleteuser = catchAsyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  //we will  add cloudinary later
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with id${req.params.id}`)
    );
  }
  await user.remove();

  res.status(400).json({
    success: true,
    message: "User has been deleted",
  });
});

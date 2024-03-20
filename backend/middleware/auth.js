const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("./catchAsyncerrors");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
exports.isAuthenticatedUser = catchAsyncerrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedata = jwt.verify(token, process.env.JWT_SECRECT);

  req.user = await User.findById(decodedata.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

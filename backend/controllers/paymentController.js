const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAsyncerrors(async (req, res, next) => {
  console.log(req.body.amount);
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: "testing transaction",
    metadata: {
      company: "Ecommerce",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncerrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  OrderItem: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentinfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    //required: true,
  },
  itemsprice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxprice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingprice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalprice: {
    type: Number,
    default: 0,
    required: true,
  },
  Orderstatus: {
    type: String,
    required: true,
    default: "Proccesing",
  },
  deliveredat: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Order", orderschema);

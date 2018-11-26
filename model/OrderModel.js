const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
 
const orderSchema = new Schema({

  customerName: {
    type: String,
    trim: true,
    required: true
  },
  partName: {
    type: String,
    trim: true,
    required: true
  },
  partLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: moment().format("MM/DD/YY")
  },
  employee: {
    type: String
  },
  isFulfilled: {
    type: Boolean,
    default: false
  },
  carrierCode: {
    type: String,
    default: "N/A"
  },
  trackingNumber: {
    type: String,
    default: "N/A"
  },
  estimatedDelivery: {
    type: String,
    default: "N/A"
  },
  actualDelivery: {
    type: String,
    default: "N/A"
  },
  status: {
    type: String
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
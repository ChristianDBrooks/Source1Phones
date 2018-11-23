const mongoose = require("mongoose");
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
  timeIn: {
    type: String
  },
  employee: {
    type: String
  },
  trackingNumber: {
    type: String
  },
  estimatedDelivery: {
    type: String
  },
  status: {
    type: String
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
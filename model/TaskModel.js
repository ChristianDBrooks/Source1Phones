const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const taskSchema = new Schema({
  customerName: {
    type: String,
    trim: true,
    required: true
  },
  device: {
    type: String,
    trim: true,
    required: true
  },
  imei: {
    type: Number
  },
  repair: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  timeIn: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  employee: {
    type: String
  },
  archived: {
    type: Boolean,
    default: false,
    required: true
  },
  timestamp: {
    type: Number
  },
  timeComplete: {
    type: String
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
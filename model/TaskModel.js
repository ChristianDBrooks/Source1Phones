const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const taskSchema = new Schema({
  priority: {
    type: Number
  },
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
  repair: {
    type: String,
    required: true
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
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
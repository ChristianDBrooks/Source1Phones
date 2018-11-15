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
  priority: {
    type: Number
  },
  timeIn: {
    type: String,
    required: true
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
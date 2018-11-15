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
  employee: {
    type: String
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true
  },
  dateEmployed: {
      type: String
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
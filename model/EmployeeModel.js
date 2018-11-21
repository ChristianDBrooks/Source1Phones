const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
 
const employeeSchema = new Schema({
  employeeName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateEmployed: {
      type: String,
      default: moment().format("MM/DD/YY").toString(),
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  employeeThumbnail: {
    type: String,
    default: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1-744x744.jpg"
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
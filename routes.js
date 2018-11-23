const db = require("./model/index.js");
const taskController = require("./controllers/task");
const employeeController = require("./controllers/employee");
const orderController = require("./controllers/order");

module.exports = (app) => {
    taskController(app, db)
    employeeController(app, db)
    orderController(app, db)
};

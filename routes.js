const db = require("./model/index.js");
const moment = require("moment");

module.exports = (app) => {
    // Route 1
    // Get all tasks inside tasks collection sorted by priority.
    app.get("/api/task", (req, res) => {
        db.Task.find({}, null, {sort: {priority: 1}}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Route 2
    // Create a new task 
    app.post("/api/task", (req, res) => {
        console.log("This is the requrest body", req.body);
        // Check the count of tasks existing.
        db.Task.count().then(count => {
            db.Task.create({
                customerName: req.body.name,
                device: req.body.device,
                repair: req.body.repair,
                employee: req.body.employee,
                // Create a new priority value based on number of tasks currently in collection.
                priority: count + 1,
                timeIn: moment().format("hh:mm A").toString(),
                date: moment().format("MM/DD/YYYY - H:MM").toString()
            }, function (err, newTask) {
                if (err) {
                    console.log("Error: ", err);
                    res.status(400).end();
                } else {
                    // console.log("\n\nSuccess -- New Task Created\n\n", newTask);
                    res.status(200).end();
                }
            })    
        })
    })


    // Route 3
    // Update the priority of a task.
    app.put("/api/task/priority/:id", (req, res) => {
        db.Task.findByIdAndUpdate(req.params.id, {priority: req.body.priority}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Updated Task \n\n", result);
                res.status(200).end();     
            }

        })
    })

    // Route 4
    // Update the assigned employee of a task.
    app.put("/api/task/employee/:id", (req, res) => {
        db.Task.findByIdAndUpdate(req.params.id, {employee: req.body.employee}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Updated Task \n\n", result);
                res.status(200).end();     
            }

        })
    })

    // Route 5
    // Delete a task
    app.delete("/api/task/:id", (req, res) => {
        db.Task.findByIdAndDelete(req.params.id, (err, deletedTask) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Deleted Task\n\n", deletedTask);
                res.status(200).end();
            }

        })
    })

    // Route 7
    // Get all users inside users collection.
    app.get("/api/employee", (req, res) => {
        db.Employee.find({}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Route 8
    // Create a new employee!
    app.post("/api/employee", (req, res) => {
        db.Employee.create({
            employeeName: req.body.employee,
            dateEmployed: moment().format("MM/DD/YY").toString()
        }, function (err, newEmployee) {
            if (err) {
                console.log("Error: ", err);
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- New Task Created\n\n", newEmployee);
                res.status(200).end();
            }
        })
    })
};
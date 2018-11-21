const db = require("./model/index.js");
const moment = require("moment");

module.exports = (app) => {
    // Route 1
    // Get all tasks inside tasks collection sorted by priority.
    app.get("/api/task", (req, res) => {
        db.Task.find({ archived: false }, null, { sort: { priority: 1 } }, (err, result) => {
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
        let createdPriority = 1;
        if (req.body.lastTask) {
            createdPriority = (req.body.lastTask.priority + 1);
        }
        // Check the count of tasks existing.
        db.Task.create({
            customerName: req.body.name,
            device: req.body.device,
            repair: req.body.repair,
            employee: req.body.employee,
            // Create a new priority value based on number of tasks currently in collection.
            priority: createdPriority,
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

    // Route 3a
    // Update the priority of a task up by 1.
    app.put("/api/task/increase/:id/:priority", (req, res) => {
        const currentIndex = parseInt(req.params.priority);
        // Subtract priority by 1
        const modifiedIndex = parseInt(req.params.priority) - 1;
        console.log(modifiedIndex);
        // First grab the task above the target task. And change its priority with the target id's position.
        db.Task.findOneAndUpdate({ priority: modifiedIndex, archived: false }, { priority: currentIndex }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Updated Task \n\n", result);
                db.Task.findByIdAndUpdate(req.params.id, { priority: modifiedIndex }, (err, result) => {
                    if (err) {
                        console.log("Error: ", err)
                        res.status(400).end();
                    } else {
                        console.log("\n\nSuccess -- Updated Task \n\n", result);
                        res.status(200).end();
                    }
                })
            }
        })
    })

    // Route 3b
    // Update the priority of a task down by 1.
    app.put("/api/task/decrease/:id/:priority", (req, res) => {
        const currentIndex = parseInt(req.params.priority);
        // Add to priority by 1
        const modifiedIndex = parseInt(req.params.priority) + 1;
        db.Task.findOneAndUpdate({ priority: modifiedIndex, archived: false }, { priority: currentIndex }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Updated Task \n\n", result);
                db.Task.findByIdAndUpdate(req.params.id, { priority: modifiedIndex }, (err, result) => {
                    if (err) {
                        console.log("Error: ", err)
                        res.status(400).end();
                    } else {
                        console.log("\n\nSuccess -- Updated Task \n\n", result);
                        res.status(200).end();
                    }
                })
            }
        })
    })

    // Route 4
    // Update the assigned employee of a task.
    app.put("/api/task/employee/:id", (req, res) => {
        db.Task.findByIdAndUpdate(req.params.id, { employee: req.body.employee }, (err, result) => {
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
    // Change archive field to true so we no longer see tasks, but it still can be saved as a history of tasks.
    app.put("/api/task/archive/:id", (req, res) => {
        db.Task.findByIdAndUpdate(req.params.id, { archived: true }, (err, updatedTask) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Deleted Task\n\n", updatedTask);
                res.status(200).end();
            }
        }).then((updatedTask) => {
            for (let i = updatedTask.priority + 1; i <= req.body.tasks.length; i++) {
                console.log(`Changing tasks with priority ${i} to the new priority of ${i - 1}`);
                db.Task.findOneAndUpdate({ priority: i }, { priority: (i - 1) }, (err, results) => {
                    if (err) {
                        console.log("Error: ", err)
                        res.status(400).end();
                    } else {
                        // console.log("\n\nSuccess -- Deleted Task\n\n", updatedTask);
                        res.status(200).end();
                    }
                })
            }
        })
    })

    // Route 6
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

    // Route 7
    // Get all users inside users collection.
    app.get("/api/employee/user/:id", (req, res) => {
        db.Employee.findById(req.params.id, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            console.log("\n\nSuccess -- Found Current User\n\n", result);
            res.json(result);
        })
    })

    // Route 8
    // Get all users online inside users collection.
    app.get("/api/employee/online", (req, res) => {
        db.Employee.find({isOnline: true}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Route 9
    // Get all users offline inside users collection.
    app.get("/api/employee/offline", (req, res) => {
        db.Employee.find({isOnline: false}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Route 10
    // Create a new employee!
    app.post("/api/employee", (req, res) => {
        db.Employee.create({
            employeeName: req.body.name,
            password: req.body.password
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

    // Route 11
    // Validate current users password.
    app.post("/api/employee/validate/:id", (req, res) => {
        console.log(req.body);
        db.Employee.findById(req.params.id, (err, result) => {
            console.log("\n\nPassword in DB: " + result.password + "\nPassword given: " + req.body.passwordToCheck);
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else if (result.password !== req.body.passwordToCheck) {
                res.json({validated: false})
            } else {
                res.json({validated: true})
            }
        })
    })

    // Route 12
    // Login in user
    app.put("/api/employee/status/:id", (req, res) => {
        db.Employee.findByIdAndUpdate(req.params.id, {isOnline: req.body.status}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                res.status(200).end();
            }
        })
    })

    // Route 13
    // Check if user is logged in
    app.get("/api/employee/status/:id", (req, res) => {
        db.Employee.findById(req.params.id, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                res.json({status: result.isOnline});
            }
        })
    })

};

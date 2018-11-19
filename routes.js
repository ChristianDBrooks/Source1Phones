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
                console.log("\n\nSuccess -- Updated Task \n\n", result);
                res.status(200).end();
            }
        }).then(() => {
            // Then grab the target task by id and change its priority to decrease moving it up in the table
            db.Task.findByIdAndUpdate(req.params.id, { priority: modifiedIndex }, (err, result) => {
                if (err) {
                    console.log("Error: ", err)
                    res.status(400).end();
                } else {
                    console.log("\n\nSuccess -- Updated Task \n\n", result);
                    res.status(200).end();
                }
            })
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
                console.log("\n\nSuccess -- Updated Task \n\n", result);
                res.status(200).end();
            }
        }).then(() => {
            db.Task.findByIdAndUpdate(req.params.id, { priority: modifiedIndex }, (err, result) => {
                if (err) {
                    console.log("Error: ", err)
                    res.status(400).end();
                } else {
                    console.log("\n\nSuccess -- Updated Task \n\n", result);
                    res.status(200).end();
                }
            })
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
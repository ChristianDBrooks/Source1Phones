const moment = require("moment");

module.exports = (app, db) => {
    // Route 1
    // Get all tasks inside tasks collection sorted by priority.
    app.get("/api/task/incomplete", (req, res) => {
        db.Task.find({ archived: false }, null, { sort: { timestamp: 1 } }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    app.get("/api/task/complete", (req, res) => {
        db.Task.find({ archived: true }, null, { sort: { timestamp: 1 } }, (err, result) => {
            console.log("Checking db...")
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            console.log("\n\nSuccess -- Found All Results\n\n", result);
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
            imei: req.body.imei,
            timeIn: moment().utcOffset(-5).format("h:mm A").toString(),
            date: moment().utcOffset(-5).format("MM-DD-YY").toString(),
            timeComplete: moment().format("MM-DD-YY").toString(),
            timestamp: moment().unix(),

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
        db.Task.findByIdAndUpdate(req.params.id, { archived: true, timestamp: moment().unix() }, (err, updatedTask) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                // console.log("\n\nSuccess -- Deleted Task\n\n", updatedTask);
                res.status(200).end();
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
}
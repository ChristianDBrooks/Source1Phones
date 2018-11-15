const db = require("./model/index.js");
const moment = require("moment");

module.exports = (app) => {
    // Route 1
    // Get all tasks inside tasks collection.
    app.get("/api/task/getAll", (req, res) => {
        db.Task.find({})
            .then((results) => {
                console.log(results);
                res.json(results);
            })
    })

    // Route 2
    // Create a new task
        app.post("/api/task/create", (req, res) => {
            console.log("Name: ", req.body.name);
            console.log("Device: ", req.body.device);
        res.send("It worked!");
    })

    // app.post("/api/task/create", (req, res) => {
    //     db.Task.create({
    //         customerName: req.params.name,
    //         device: req.params.device,
    //         priority: req.params.priority,
    //         timeIn: moment().format("MM/DD/YY - HH:MM").toString()
    //     }, function (err, newTask) {
    //         if (err) console.log(err);
    //         console.log(newTask);
    //     })
    //     .then(() => res.status(200).end())
    // })


    // Route 3
    // Update a task

    // Route 4
    // 

};
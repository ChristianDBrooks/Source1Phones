module.exports = (app, db) => {
    // Route 1
    // Get all tasks inside tasks collection sorted by priority.
    app.get("/api/order", (req, res) => {
        db.Order.find({ fulfilled: false }, (err, result) => {
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
    app.post("/api/order", (req, res) => {
        db.Order.create({
            customerName: req.body.customerName,
            partName: req.body.partName,
            partLink: req.body.partLink,
            orderMemo: req.body.orderMemo,
            employee: req.body.employee
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

    // Route 3
    // Delete a task
    app.delete("/api/order/:id", (req, res) => {
        db.Order.findByIdAndDelete(req.params.id, (err, deletedOrder) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                console.log(deletedOrder);
                // console.log("\n\nSuccess -- Deleted Task\n\n", deletedTask);
                res.status(200).end();
            }

        })
    })

}
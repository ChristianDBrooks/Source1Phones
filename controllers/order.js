const axios = require("axios");

module.exports = (app, db) => {
    // Route 1

    // Get all orders in db.
    app.get("/api/order", (req, res) => {
        db.Order.find({}, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Get all unfulfilled orders.
    app.get("/api/order/unfulfilled", (req, res) => {
        db.Order.find({ isFulfilled: false }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Get all fulfilled orders
    app.get("/api/order/fulfilled", (req, res) => {
        db.Order.find({ isFulfilled: true }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Find all fulfilled orders and get updated data from shipengine.
    app.get("/api/order/update", (req, res) => {
        db.Order.find({ isFulfilled: true }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                result.forEach(order => {
                    axios.get("https://cors-anywhere.herokuapp.com/https://api.shipengine.com/v1/tracking?", {
                        params: {
                            carrier_code: order.carrierCode,
                            tracking_number: order.trackingNumber,
                        },
                        headers: {
                            // ON FINAL
                            'api-key': process.env.SHIPENGINE_KEY,
                            'Origin': 'https://api.shipengine.com/v1/tracking?' 
                        }
                    })
                    .then(response => {
                        db.Order.findByIdAndUpdate(order._id, 
                            { $set: {status: response.data.status_description, estimatedDelivery: response.data.estimated_delivery_date, actualDelivery: response.data.actual_delivery_date}
                        }, (err, result) => {
                            if (err) {
                                console.log("Error: ", err)
                                res.status(400).end();
                            } else {
                                res.status(200).end();
                            }
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
                })
            }
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
            status: "Requested",
            employee: req.body.employee
        }, function (err, newOrder) {
            if (err) {
                console.log("Error: ", err);
                res.status(400).end();
            } else {
                console.log("\n\nSuccess -- New Order Created\n\n", newOrder);
                res.status(200).end();
            }
        })
    })

    // Find task by id and change status from requested to fulfilled and set tracking data.
    app.put("/api/order/fulfill/:id", (req, res) => {
        console.log("Order of id" + req.params.id + "being fulfilled with tacking number" + req.body.tracking);
        db.Order.findByIdAndUpdate(req.params.id, { $set: { isFulfilled: true, trackingNumber: req.body.tracking, carrierCode: req.body.carrier } }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.status(200).end();
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
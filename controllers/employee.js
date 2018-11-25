var bcrypt = require('bcryptjs');

module.exports = (app, db) => {
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
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                db.Employee.create({
                    employeeName: req.body.name,
                    // Store hash in your password DB.
                    password: hash
                }, function (err, newEmployee) {
                    if (err) {
                        console.log("Error: ", err);
                        res.status(400).end();
                    } else {
                        // console.log("\n\nSuccess -- New Task Created\n\n", newEmployee);
                        res.status(200).end();
                    }
                })
            });
        });
    })

    // Route 11
    // Validate current users password.
    app.post("/api/employee/validate/:id", (req, res) => {
        db.Employee.findById(req.params.id, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            } else {
                bcrypt.compare(req.body.passwordToCheck, result.password)
                .then((bcryptRes) => {
                    return res.json({validated: bcryptRes})
                })
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
}
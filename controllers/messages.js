const moment = require("moment");

module.exports = (app, db) => {
    // Route 1

    // Get all messsages in db sorted oldest to newest.
    app.get("/api/message", (req, res) => {
        db.Message.find({}, null, { sort: { unixTimestamp: 1 } }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            // console.log("\n\nSuccess -- Found All Results\n\n", result);
            res.json(result);
        })
    })

    // Get all messages in the last 8 hours messsages in db sorted oldest to newest.
    app.get("/api/message/history", (req, res) => {
        // 8 Hours before current moment in Unix timestamp.
        const loadingPoint = (moment().unix() - 28800);
        //load all messages that were created after 8 hours before now.
        db.Message.find({ unixTimestamp: { $gt: loadingPoint } }, null, { sort: { unixTimestamp: 1 } }, (err, result) => {
            if (err) {
                console.log("Error: ", err)
                res.status(400).end();
            }
            console.log("\n\nSuccess -- Found All History Results\n\n", result);
            res.json(result);
        })
    })
}
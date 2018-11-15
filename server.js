const express = require("express");
const routes = require("./routes.js")
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect("mongodb://localhost/phoneStoreDB");

app.use(bodyParser.urlencoded());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//OtherRoutes
routes(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

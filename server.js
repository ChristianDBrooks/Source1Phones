const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const routes = require("./routes.js")
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// ON DEPLOY
// ON FINAL DELETE
// const databaseURL= "mongodb://heroku_h7td18l7:q9849552n1rsbe5r5jbfvqdi2g@ds039737.mlab.com:39737/heroku_h7td18l7"
const databaseURL = process.env.MONGODB_URI || "mongodb://localhost/phoneStoreDB";
mongoose.connect(databaseURL);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//OtherRoutes
routes(app);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});


// Socket.io

io.on('connection', function (client) {
  console.log("User connected!");

  client.on('sendMessage', function (data) {
    io.emit('receiveMessage', data);
  })

  client.on('disconnect', function () {
    console.log("User disconnected!")
  });
});

//Check if db connect properly if it does run server, if not throw error.
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  // we're connected!
  //Server
  server.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});


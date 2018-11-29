const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);
const routes = require("./routes.js")
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require("./model/index")
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
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});


// Socket.io Live Chat

io.on('connection', function (client) {
  client.on('sendConnected', function(data) {
    console.log("User connected: " + data.name)
    io.emit('recieveConnected', data)
    client.on('disconnect', () => {
      io.emit('recieveDisconnected', data)
      console.log('User disconnected: ' + data.name)
    })
  })

  client.on('sendMessage', function (data) {
    io.emit('receiveMessage', data);
    db.Message.create({
      author: data.author,
      message: data.message,
      timestamp: data.timestamp,
      unixTimestamp: data.unixTimestamp
    }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    })
  })
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


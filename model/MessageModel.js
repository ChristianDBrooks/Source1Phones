const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({

    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String
    },
    unixTimestamp: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        default: "MSG"
    },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
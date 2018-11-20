import React, { Component } from "react";
import NavBar from "../components/NavBar/Nav.js";
import io from "socket.io-client";
import moment from "moment";

class Chat extends Component {
    constructor(props){
        super(props);

        this.state = {
            message: '',
            messages: []
        };

        this.socket = io(window.location.hostname);

        this.socket.on('receiveMessage', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = event => {
            event.preventDefault();
            this.socket.emit('sendMessage', {
                author: localStorage.getItem("username"),
                message: this.state.message,
                timestamp: moment().format("h:mm A")
            })
            this.setState({message: ''});
        }
    }
    render() {
        return (
            <div>
                <NavBar />
                <div className="container bg-light mt-4 p-4 shadow">

                    <h1>Chat</h1>

                    <hr className="bg-light" />

                    <div className="row">

                        <div className="col-8">
                            <div className="container bg-dark px-0" id="chatbox">
                                <div className="p-2 mb-3 d" style={{ height: "250px", overflow: "auto" }} id="chat-log">
                                    {this.state.messages.map( (message, index) => {
                                        return (
                                            <div key={index} className="row no-gutters">
                                                <div className="col-md-2 text-light"><b>{message.author}</b></div>
                                                <div className="col-md-8">{message.message}</div>
                                                <div className="col-md-2">{message.timestamp}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <form action="">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" placeholder="Your message here.." className="form-control" id="message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                        <div className="input-group-append">
                                            <input defaultValue="SEND" className="btn btn-outline-success" onClick={this.sendMessage} id="send-message" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-4">
                            <form action="">
                                <div className="form-group">
                                    <textarea name="online-users" cols="30" rows="10" className="form-control"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Chat;
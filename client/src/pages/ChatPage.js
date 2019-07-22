import React, { Component } from "react";
import NavBar from "../components/NavBar/Nav.js";
import io from "socket.io-client";
import moment from "moment";
import messageAPI from "../utils/api/messageAPI";
// // ON DEPLOY
const socketURL = 'localhost:3001';
// const socketURL = window.location.hostname;

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            content: [],
            onlineUsers: []
        };

        // ONDEPLOY NEEDS TO BE socketURl
        this.socket = io(socketURL);

        this.componentDidMount = () => {
            this.loadMessageHistory();
            this.notifyConnection();
        }

        this.socket.on('receiveMessage', function (data) {
            addContent(data);
        });

        this.socket.on('receiveConnected', function (data) {
            addUser(data.name)
            addContent({
                message: `${data.name} has joined!`,
                type: "NTFC"
            });
        })

        this.socket.on('receiveDisconnected', function (data) {
            removeUser(data.name)
            addContent({
                message: `${data.name} has left!`,
                type: "NTFD"
            });
        })

        this.loadMessageHistory = () => {
            messageAPI.getMessageHistory()
                .then(oldContent => {
                    console.log(oldContent.data)
                    this.setState({ content: oldContent.data });
                    if (window.location.pathname === "/chat") {
                        const element = document.getElementById("chat-log");
                        element.scrollTop = element.scrollHeight;
                    }
                })
        }

        const addContent = data => {
            this.setState({ content: [...this.state.content, data] });
            if (window.location.pathname === "/chat") {
                const element = document.getElementById("chat-log");
                element.scrollTop = element.scrollHeight;
            }
        }

        const addUser = data => {
            this.setState({ onlineUsers: [...this.state.onlineUsers, data] })
        }

        const removeUser = data => {
            this.setState({ onlineUsers: this.state.onlineUsers.splice(this.state.onlineUsers.indexOf(data), 1) })
        }

        this.sendMessage = event => {
            event.preventDefault();
            this.socket.emit('sendMessage', {
                author: sessionStorage.getItem("currentEmployee"),
                message: this.state.message,
                type: "MSG",
                timestamp: moment().format("h:mm A"),
                unixTimestamp: moment().unix()
            })
            this.setState({ message: '' });
        }

        this.notifyConnection = () => {
            this.socket.emit('sendConnected', {
                name: sessionStorage.getItem("currentEmployee")
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/chat-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div className="container bg-light mt-4 p-3 shadow">

                    <h4 className="m-0">Chat</h4>
                </div>
                <div className="container bg-light mt-4 p-4 shadow">


                    <div className="row no-gutters">

                        <div className="col-sm-10 pr-sm-3">
                            <div className="container bg-dark px-0" id="chatbox">
                                <div className="p-3 mb-3" style={{ height: "50vh", overflowY: "scroll", overflowX: "hidden" }} id="chat-log">

                                    {/* NEW STYLE */}
                                    {this.state.content.map((content, index) => {
                                        if (content.type === "MSG") {
                                            return (
                                                <div key={index} className="row">
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-12 text-left">
                                                                <h6 className="text-light mt-1">
                                                                    {content.author}
                                                                    <span className="font-weight-normal text-secondary ml-2">{content.timestamp}</span>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 text-left">
                                                                <p className="bg-primary py-1 px-2 mb-2" style={{ borderRadius: 10 }}>
                                                                    {content.message}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else if (content.type === "NTFC") {
                                            return (<div key={index} className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-12 text-left">
                                                            <p className="font-italic">
                                                                {content.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        } else {
                                            return (<div key={index} className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-12 text-left">
                                                            <p className="font-italic">
                                                                {content.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    })}
                                </div>
                            </div>
                            <form onSubmit={this.sendMessage} className="mr-3">
                                <div className="form-group">
                                    <div className="input-group">
                                        <input type="text" placeholder="Your message here.." className="form-control form-control-sm mb-0 pb-0" id="message" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-outline-success btn-sm" id="send-message">SEND</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-sm-2 px-3" style={{ backgroundColor: "#f2f2f2" }}>
                            <div className="pt-3 text-center">
                                <h6>Online Users</h6>
                                <hr />
                                <div>
                                    {this.state.onlineUsers.map(employee => {
                                        return (
                                            <div key={employee} className="text-primary">{employee}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Chat;
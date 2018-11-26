import React, { Component } from "react";
import NavBar from "../components/NavBar/Nav.js";
import io from "socket.io-client";
import moment from "moment";
import employeeAPI from "../utils/api/employeeAPI";
import messageAPI from "../utils/api/messageAPI";
// const socketURL = 'localhost:3001';
const socketURL = window.location.hostname;

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            currentUsername: '',
            messages: [],
            onlineUsers: []
        };

        // ONDEPLOY NEEDS TO BE socketURl
        this.socket = io(socketURL);

        this.componentDidMount = () => {
            this.loadMessageHistory();
            this.loadEmployeesOnline();
            this.loadCurrentUser();
        }

        this.socket.on('receiveMessage', function (data) {
            addMessage(data);
        });

        this.loadEmployeesOnline = () => {
            employeeAPI.getOnlineEmployees()
                .then((response) => {
                    this.setState({onlineUsers: response.data})
                })
        }

        this.loadCurrentUser = () => {
            const currentID = sessionStorage.getItem("currentUserID");
            employeeAPI.getCurrentUser(currentID)
            .then(response => {
                this.setState({currentUsername: response.data.employeeName})
            })
        }

        this.loadMessageHistory = () => {
            messageAPI.getMessageHistory()
            .then(oldMessages => {
                this.setState({ messages: oldMessages.data });
                const element = document.getElementById("chat-log");
                element.scrollTop = element.scrollHeight;
            })
        }

        const addMessage = data => {
            this.setState({ messages: [...this.state.messages, data] });
            const element = document.getElementById("chat-log");
            element.scrollTop = element.scrollHeight;
        }

        this.sendMessage = event => {
            event.preventDefault();
            this.socket.emit('sendMessage', {
                author: this.state.currentUsername,
                message: this.state.message,
                timestamp: moment().format("h:mm A"),
                unixTimestamp: moment().unix()
            })
            this.setState({ message: '' });
        }
    }
    render() {
        return (
            <div style={{ backgroundImage: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/chat-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center"}}>
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
                                    {this.state.messages.map((message, index) => {
                                        return (
                                            <div key={index} className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-12 text-left">
                                                            <h6 className="text-light mt-1">
                                                                {message.author}
                                                                <span className="font-weight-normal text-secondary ml-2">{message.timestamp}</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-12 text-left">
                                                            <p className="bg-primary py-1 px-2 mb-2" style={{ borderRadius: 10 }}>
                                                                {message.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
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
                                            <div key={employee._id} className="text-primary">{employee.employeeName}</div>
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
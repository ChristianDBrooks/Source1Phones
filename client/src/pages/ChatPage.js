import React from "react";

const Chat = () => (
    <div className="container bg-light mt-4 p-4 shadow">

        <h1>Chat</h1>

        <hr className="bg-light" />

        <div className="row">

            <div className="col-8">
                <div className="container bg-primary" id="chatbox">
                    <div className="p-2 mb-3" style={{height: "250px"}} id="chat-log">
                    </div>
                </div>
                <form action="">
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" placeholder="Your message here.." className="form-control" id="message" />
                            <div className="input-group-append">
                                <input type="submit" value="SEND" className="btn btn-outline-success" id="send-message" />
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
);

export default Chat;
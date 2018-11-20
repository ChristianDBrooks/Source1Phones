// Import react from npm react as 'React'
import React, { Component } from "react";
import { Link } from "react-router-dom";

// create a new className called 'Counter' with adding all React features using extends React.Component
class LoginPage extends Component {
    // Set a state with a variable called 'count'.
    // STATE HERE <=====
    state = {
        username: ""
    };

    componentDidMount() {
        localStorage.setItem("username", "");
    }

    // Create a state handler that focuses on 'count' and then change the count +1 or -1
    // METHODS HERE <=====
    setUser = () => {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("isLoggedIn", "true");
    };

    // Call a method on the Counter className aka Counter.render as a feature from 'react.component'
    render() {
        // The method returns this jsx.
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col col-md-4">
                        <div className="mt-5 text-center">
                            <h1 className="text-secondary">Source1Phones</h1>
                        </div>
                        <div className="card mt-5">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form className="login" action="">
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">Username</label>
                                        <input type="text" className="form-control" id="email-input" placeholder="Username" value={this.state.message} onChange={ev => this.setState({username: ev.target.value})}/>
                                    </div>
                                    {/* <div className="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="password-input" placeholder="Password" />
                                    </div> */}
                                    <Link to="/about" className="btn btn-default" onClick={this.setUser}>LOGIN</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;

// Import react from npm react as 'React'
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import employeeAPI from "../utils/api/employeeAPI";

// create a new className called 'Counter' with adding all React features using extends React.Component
class LoginPage extends Component {
    // Set a state with a variable called 'count'.
    // STATE HERE <=====
    state = {
        allEmployees: [],
        selectedEmployee: {},
        enteredPassword: "",
        redirect: false,
    };

    componentDidMount() {
        this.loadAllEmployees();
    }

    // Create a state handler that focuses on 'count' and then change the count +1 or -1
    // METHODS HERE <=====
    passwordUpdater = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        console.log(`Setting ${name} to ${value}`)
        this.setState({ [name]: value })
    };

    employeeUpdater = (event) => {
        event.preventDefault();
        const selectedID = event.target.childNodes[event.target.selectedIndex].getAttribute("id");
        this.setState({
            selectedEmployee:
            {
                name: event.target.value,
                id: selectedID
            }
        })
    };

    loginHandler = (event) => {
        event.preventDefault();
        // Check if entered password is valid.
        console.log(`Checking if the password ${this.state.enteredPassword} matches database password for employee ${this.state.selectedEmployee.name}`)
        employeeAPI.validateClient(this.state.selectedEmployee.id, this.state.enteredPassword)
            .then((response) => {
                console.log("The response was ", response);
                if (!response.data.validated) {
                    alert("Employee ID or password not found.")
                } else {
                    console.log(`User was validated, changing status to online...`)
                    employeeAPI.changeEmployeeOnlineStatus(this.state.selectedEmployee.id, true)
                        .then(() => {
                            console.log("Setting session storage variables.")
                            sessionStorage.setItem("currentUserID", this.state.selectedEmployee.id)
                            sessionStorage.setItem("currentEmployee", this.state.selectedEmployee.name)
                            // Redirect to home page.
                            this.setState({ redirect: true })
                        })
                }
            })
    }

    loadAllEmployees = () => {
        employeeAPI.getAllEmployees()
            .then((results) => {
                results.data.forEach(employee => {
                    this.setState({ allEmployees: [...this.state.allEmployees, employee] })
                })
            })
    }

    // Call a method on the Counter className aka Counter.render as a feature from 'react.component'
    render() {
        // The method returns this jsx.
        if (this.state.redirect) {
            return (
                <Redirect to="/tasks" />
            )
        } else {
            return (
                <div style={{ backgroundImage: "url(./images/login-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center"}}>
                    <div className="container">
                        <div className="row" style={{ height: "20vh" }}>

                        </div>
                        <div className="row justify-content-center">
                            <div className="col col-lg-4 d-flex flex-column">
                                <div className="text-center">
                                    <h1 className="border border-white p-1 text-white py-2 bg-primary" style={{ fontSize: "1.5em" }}>Source1Phones</h1>
                                </div>
                                <div className="card text-light border-light bg-primary" >
                                    <div className="card-header text-light border-bottom">
                                        <h4 className="text-white m-0">Login</h4>
                                    </div>
                                    <div className="card-body">
                                        <form className="login" onSubmit={this.loginHandler}>
                                            <div className="form-group">
                                                <label htmlFor="selectedEmployee">Employee</label>
                                                <select className="form-control form-control-sm mb-3" name="selectedEmployee" onChange={this.employeeUpdater}>
                                                    <option>Please select an employee...</option>
                                                    {this.state.allEmployees.map(employee => {
                                                        return (<option key={employee._id} id={employee._id}>{employee.employeeName}</option>)
                                                    })   
                                                    }
                                                </select>
                                                <label htmlFor="password" >Password</label>
                                                <input className="form-control form-control-sm" type="password" name="enteredPassword" placeholder="Company password..." onChange={this.passwordUpdater}/>
                                            </div>
                                            <button type="submit" className="btn btn-block btn-sm pt-3 mt-4">LOGIN</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default LoginPage;

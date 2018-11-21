import React, { Component } from "react";
import employeeAPI from "../utils/api/employeeAPI";
import NavBar from "../components/NavBar/Nav.js";
import CreateEmployeeForm from "../components/CreateEmployeeForm/CreateEmployeeForm"

class AdminPage extends Component {
    state = {
        allEmployees: [],
        name: "",
        password: "",
    }

    // Do these on start

    componentDidMount() {
        // Get archived tasks.
        // Get Logged in Users
        this.loadAllEmployees();
    }

    // Form Methods

    inputChangeHandler = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
        console.log("Changes occuring to ", name);
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        // Compile data from set state to send as one body to database create request.
        const compiledData = {
            name: this.state.name,
            password: this.state.password,
        }
        console.log("Compiled Data to be sent...\n\n", compiledData);
        employeeAPI.createEmployee(compiledData).then(() => {
            this.loadAllEmployees();
        })
    }

    // Task Methods

    loadAllEmployees() {
        employeeAPI.getAllEmployees()
        .then((results) => {
            this.setState({allEmployees: results.data});
        })
    }

    render() {
        return (
            <div style={{ backgroundImage: "url(./images/tasks-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center"}}>
                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <h1>Admin Page</h1>
                        <hr className="bg-light" />
                    </div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <ul className="list-group">
                            {this.state.allEmployees.map(employee => {
                                return (<li className="list-group-item" key={employee._id}>{employee.employeeName}</li>);
                            })}
                        </ul>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        {/* Create Task Form Component */}
                        <CreateEmployeeForm
                            inputHandler={this.inputChangeHandler}
                            submitHandler={this.submitFormHandler}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage;
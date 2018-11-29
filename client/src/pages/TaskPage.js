import React, { Component } from "react";
import taskAPI from "../utils/api/taskAPI";
import employeeAPI from "../utils/api/employeeAPI";
import NavBar from "../components/NavBar/Nav.js";
import TaskForm from "../components/TaskForm/Form.js";
import Modal from "../components/Modal/Modal.js";
import IncompleteTaskTable from "../components/IncompleteTaskTable/Table.js";
import IncompleteTaskTableRow from "../components/IncompleteTaskTable/TableRow.js";
import CompleteTaskTable from "../components/CompleteTaskTable/Table.js";
import CompleteTaskTableRow from "../components/CompleteTaskTable/TableRow.js";

class Task extends Component {
    state = {
        incompleteTasks: [],
        completeTasks: [],
        employees: [],
        name: "",
        device: "",
        repair: "",
        employee: "",
        imei: "",
        notes: "",
    }

    // Do these on start

    componentDidMount() {
        this.loadIncompletTasks();
        this.loadCompletTasks();
        this.loadEmployees();
    }

    // Form Methods

    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    inputChangeUpdater = event => {
        const taskID = event.target.id;
        const assignedEmployee = event.target.value
        taskAPI.updateEmployee(taskID, { employee: assignedEmployee }).then(() => {
            this.loadIncompletTasks();
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        // Compile data from set state to send as one body to database create request.
        const compiledData = {
            name: this.state.name,
            device: this.state.device,
            repair: this.state.repair,
            employee: this.state.employee,
            imei: this.state.imei,
            notes: this.state.notes,
        }
        taskAPI.createNewTask(compiledData).then(() => {
            this.loadIncompletTasks();
        })
        this.setState(
            {
                name: "",
                device: "",
                repair: "",
                employee: "",
                imei: "",
                notes: ""
            }
        )
    }

    // Task Methods

    loadIncompletTasks() {
        taskAPI.getIncompleteTasks()
            .then(results => {
                this.setState({ incompleteTasks: results.data })
            })
            .catch(err => { if (err) console.log(err) });
    }

    loadCompletTasks() {
        taskAPI.getCompleteTasks()
            .then(results => {
                this.setState({ completeTasks: results.data })
            })
            .catch(err => { if (err) console.log(err) });
    }

    archiveTask = (id) => {
        taskAPI.archiveTask(id)
            .then(() => {
                this.loadIncompletTasks();
                this.loadCompletTasks();
            })
    }

    refreshIncompleteTasks = () => {
        this.loadIncompletTasks();
    }

    refreshCompleteTasks = () => {
        this.loadCompletTasks();
    }

    // Employee Methods

    updateEmployee = (employee) => {
        taskAPI.updateEmployee(employee)
            .then(() => this.loadIncompletTasks())
    }

    loadEmployees() {
        employeeAPI.getAllEmployees()
            .then(results => this.setState({ employees: results.data }));
    }

    render() {
        return (
            <div style={{ backgroundImage: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/tasks-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>


                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-3 shadow">
                        <h4 className="m-0">Daily Repairs</h4>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        {/* Create Task Form Component */}
                        <TaskForm
                            employees={this.state.employees}
                            inputHandler={this.inputChangeHandler}
                            submitHandler={this.submitFormHandler}
                            name={this.state.name}
                            device={this.state.device}
                            repair={this.state.repair}
                            employee={this.state.employee}
                            imei={this.state.imei}
                            notes={this.state.notes}
                        />
                    </div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        {/* Display Table Container Component*/}
                        <div className="d-flex">
                            <legend>Pending Repairs</legend>
                            <span onClick={this.refreshIncompleteTasks}>
                                <i className="fas fa-sync-alt fa-lg"></i>
                            </span>
                        </div>
                        <hr />
                        <div className="table-responsive-md">
                            {!this.state.incompleteTasks.length ?
                                (
                                    <div className="text-center mt-3">
                                        <h4 className="text-danger mb-0 py-3">NO TASKS FOUND</h4>
                                    </div>
                                ) :
                                (<div>
                                    <IncompleteTaskTable>
                                        {this.state.incompleteTasks.map((task, index) =>
                                            <IncompleteTaskTableRow
                                                id={task._id}
                                                date={task.date}
                                                time={task.timeIn}
                                                name={task.customerName}
                                                device={task.device}
                                                repair={task.repair}
                                                employee={task.employee}
                                                key={task._id}
                                                employees={this.state.employees}
                                                inputUpdater={this.inputChangeUpdater}
                                                complete={this.archiveTask}
                                                modalID={task._id}
                                            />
                                        )}
                                    </IncompleteTaskTable>
                                    {this.state.incompleteTasks.map((task, index) => 
                                        <Modal 
                                            name={task.customerName}
                                            device={task.device}
                                            repair={task.repair}
                                            time={task.timeIn}
                                            imei={task.imei}
                                            notes={task.notes}
                                            completeStatus={task.archived}
                                            modalID={task._id}
                                            />
                                    )}
                                </div>)}
                        </div>
                    </div>
                    <div className="container bg-light mb-4 mt-4 p-4 shadow">
                        {/* Display Table Container Component*/}
                        <div className="d-flex">
                            <legend>Complete Repairs</legend>
                            <span onClick={this.refreshCompleteTasks}>
                                <i className="fas fa-sync-alt fa-lg"></i>
                            </span>
                        </div>
                        <hr />
                        <div className="table-responsive-md">
                            {!this.state.completeTasks.length ?
                                (
                                    <div className="text-center mt-3">
                                        <h4 className="text-danger mb-0 py-3">NO TASKS FOUND</h4>
                                    </div>
                                ) :
                                (<CompleteTaskTable>
                                    {this.state.completeTasks.map((task, index) =>
                                        <CompleteTaskTableRow
                                            id={task._id}
                                            date={task.date}
                                            time={task.timeIn}
                                            name={task.customerName}
                                            device={task.device}
                                            repair={task.repair}
                                            imei={task.imei}
                                            employee={task.employee}
                                            key={task._id}
                                            complete={task.timeComplete}
                                        />
                                    )}
                                </CompleteTaskTable>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Task;
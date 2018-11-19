import React, { Component } from "react";
import taskAPI from "../utils/api/taskAPI";
import employeeAPI from "../utils/api/employeeAPI";
import TaskForm from "../components/TaskForm/TaskForm.js";
import TaskTable from "../components/TaskTable/TaskTable.js";
import TaskTableRow from "../components/TaskTableRow/TaskTableRow.js";

class Task extends Component {
    state = {
        tasks: [],
        employees: [],
        name: "",
        device: "",
        repair: "",
        employee: "",
        priority: ""
    }

    // Do these on start

    componentDidMount() {
        this.getTasks();
        this.getEmployees();
    }

    // Form Methods

    inputChangeHandler = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value });
        console.log("Changes occuring to ", name);
    }
    
    inputChangeUpdater = event => {
        const taskID = event.target.id;
        const assignedEmployee = event.target.value
        taskAPI.updateEmployee(taskID, {employee: assignedEmployee}).then(() => {
            this.getTasks();
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
            lastTask: this.state.tasks[this.state.tasks.length - 1]
        }
        console.log("Compiled Data to be sent...\n\n", compiledData);
        taskAPI.createNewTask(compiledData).then(() => {
            this.getTasks();
            // this.setState({ name: "" })
            // this.setState({ device: "" })
            // this.setState({ repair: "" })
            // this.setState({ employee: "" })
            // this.setState({ priority: "" })
        })
    }

    // Task Methods

    getTasks() {
        taskAPI.getAllTasks()
            .then(results => {
                this.setState({ tasks: results.data })
                console.log(this.state.tasks);
            })
            .catch(err => { if (err) console.log(err) });
    }

    deleteTask = (id) => {
        taskAPI.deleteTask(id)
            .then(() => this.getTasks())
    }

    archiveTask = (id) => {
        taskAPI.archiveTask(id, this.state.tasks)
            .then(() => this.getTasks())
    }

    increasePriority = (id, currentPriority) => {
        if ((currentPriority - 1) <= 0) {
            console.log("Can't do that!")
            return;
        }
        console.log("Going Up");
        taskAPI.increasePriorityByOne(id, currentPriority)
        .then(() => {
            this.getTasks();
        });
    }

    decreasePriority = (id, currentPriority) => {
        if ((currentPriority + 1) > this.state.tasks.length) {
            console.log("Can't do that!")
            return;
        }
        console.log("Going Down");
        taskAPI.decreasePriorityByOne(id, currentPriority)
        .then(() => {
            this.getTasks();
        });
    }

    // Employee Methods

    updateEmployee = (employee) => {
        taskAPI.updateEmployee(employee)
            .then(() => this.getTasks())
    }

    getEmployees() {
        employeeAPI.getAllEmployees()
            .then(results => this.setState({ employees: results.data }));
    }

    render() {
        return (
            <div>
                <div className="container bg-light mt-4 p-4 shadow">
                    <h1>Daily Tasks</h1>
                    <hr className="bg-light" />
                    {/* Display Table Container Component*/}
                    <TaskTable>
                        {this.state.tasks.map( (task, index) => 
                        <TaskTableRow
                            id={task._id}
                            priority={(index + 1)}
                            inputUpdater={this.inputChangeUpdater}
                            name={task.customerName}
                            device={task.device}
                            time={task.timeIn}
                            employee={task.employee}
                            key={task.priority}
                            employees={this.state.employees}
                            complete={this.archiveTask}
                            goUp={this.increasePriority}
                            goDown={this.decreasePriority}
                        />
                        )}
                    </TaskTable>
                </div>
                <div className="container bg-light my-4 p-4 shadow">
                    {/* Create Task Form Component */}
                    <TaskForm
                        employees={this.state.employees}
                        inputHandler={this.inputChangeHandler}
                        submitHandler={this.submitFormHandler}
                    />
                </div>
            </div>
        )
    }
}

export default Task;
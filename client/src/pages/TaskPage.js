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
    }

    componentDidMount() {
        this.getTasks();
        this.getEmployees();
    }

    getTasks() {
        taskAPI.getAllTasks()
        .then(results => this.setState({tasks: results.data }))
        .catch(err => { if (err) console.log(err) });
    }

    deleteTask = (id) => {
        taskAPI.deleteTask(id)
        .then(() => this.getTasks())
    }

    updateEmployee = (employee) => {
        taskAPI.updateEmployee(employee)
        .then(() => this.getTasks())
    }

    getEmployees() {
        employeeAPI.getAllEmployees()
        .then(results => this.setState({ employees: results.data}));
    }

    render() {
        return (
            <div className="container bg-light mt-4 p-4 shadow">
                <h1>Daily Tasks</h1>
                <hr className="bg-light" />
                {/* Display Table Container Component*/}
                <TaskTable>
                    {this.state.tasks.map(task => <TaskTableRow
                        delete={this.deleteTask}
                        id={task._id}
                        priority={task.priority}
                        name={task.customerName}
                        device={task.device}
                        time={task.timeIn}
                        employee={task.employee}
                        key={task._id}
                        employees={this.state.employees}
                    />)}
                </TaskTable>
                {/* Create Task Form Component */}
                <TaskForm />
            </div>
        )
    }
}

export default Task;
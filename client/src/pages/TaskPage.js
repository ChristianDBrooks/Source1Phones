import React from "react";
import TaskForm from "../components/TaskForm/TaskForm.js";

const Task = () => (
    <div className="container bg-light mt-4 p-4 shadow">
        <h1>Daily Tasks</h1>
        <hr className="bg-light" />
        {/* Display Table Container Component*/}
        {/* Create Task Form Component */}
        <TaskForm />
    </div>
);

export default Task;
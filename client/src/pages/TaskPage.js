import React from "react";

const Task = () => (
    <div className="container bg-light mt-4 p-4 shadow">
        <h1>Daily Tasks</h1>
        <hr className="bg-light" />
        <div className="row mb-3">
            <div className="col-12">
                <form>
                    <div className="form-inline">
                        <input type="text" placeholder="Your task here.." className="form-control col-10" id="my-input" />
                        <input type="submit" className="btn btn-outline-success col-2 add-btn" id="add-task" value="ADD" />
                    </div>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <ul className="list-group" id="display-tasks">
                </ul>
            </div>
        </div>
    </div>
);

export default Task;
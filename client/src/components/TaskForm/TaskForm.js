import React from "react";
import axios from "axios";

const createTask = () => {
    axios.post("http://localhost:3001/api/task")
}

const TaskForm = () => (
<form action="http://localhost:3001/api/task" method="POST">
  <fieldset>
    <legend>New Task</legend>
    {/* Customer Name */}
    <div className="form-group">
        <label htmlFor="customerName">Customer Name</label>
        <input type="text" className="form-control" id="customerName" placeholder="Customer name..." name="name"/>
    </div>

    <div className="form-group">
        <label htmlFor="deviceName">Device Name</label>
        <input type="text" className="form-control" id="deviceName" placeholder="Device brand and model..." name="device"/>
    </div>

    <div className="form-group">
        <label htmlFor="repair">Repair Type</label>
        <input type="text" className="form-control" id="repair" placeholder="Describe the repair..." name="repair"/>
    </div>
    

    <div className="form-group">
      <label htmlFor="employee">Employee Assigned</label>
      <select className="form-control" id="employee" name="employee">
        <option>Christian</option>
        <option>Dennis</option>
        <option>Justin</option>
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="priority">Priority</label>
      <select className="form-control" id="priority" name="priority">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </fieldset>
</form>
);

export default TaskForm;
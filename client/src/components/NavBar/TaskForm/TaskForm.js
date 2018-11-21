import React from "react";

const TaskForm = props => (
  <form>
    <fieldset>
      <legend>New Task</legend>
      {/* Customer Name */}
      <div className="form-row">
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input type="text" className="form-control form-control-sm" id="customerName" placeholder="Customer name..." onChange={props.inputHandler} name="name" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="deviceName">Device Name</label>
            <input type="text" className="form-control form-control-sm" id="deviceName" placeholder="Device brand and model..." onChange={props.inputHandler} name="device" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="repair">Repair Type</label>
            <input type="text" className="form-control form-control-sm" id="repair" placeholder="Describe the repair..." onChange={props.inputHandler} name="repair" />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-10">
          <div className="form-group">
            <label htmlFor="employee">Employee Assigned</label>
            <select className="form-control form-control-sm" id="employeeFormPick" onChange={props.inputHandler} name="employee">
              <option>Please select an employee...</option>
              {props.employees.map(employee => <option key={employee._id}>{employee.employeeName}</option>)}
            </select>
          </div>
        </div>
        {/* <div className="col-md-5">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select className="form-control" id="priority" onChange={props.inputHandler} name="priority">
              <option>1</option>
            </select>
          </div>
        </div> */}
        <div className="col-md-2">
          <button className="btn btn-primary btn-sm btn-block mt-md-4" onClick={props.submitHandler}>Submit</button>
        </div>
      </div>
    </fieldset >
  </form >
);

export default TaskForm;
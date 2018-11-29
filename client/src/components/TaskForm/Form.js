import React from "react";

const TaskForm = props => (
  <form>
    <fieldset>
      <legend>New Task</legend>
      <hr className="bg-light" />
      {/* Customer Name */}
      <div className="form-row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input type="text" className="form-control form-control-sm" id="customerName" placeholder="Customer name..." value={props.name} onChange={props.inputHandler} name="name" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="deviceName">Device Name</label>
            <input type="text" className="form-control form-control-sm" id="deviceName" placeholder="Device brand and model..." value={props.device} onChange={props.inputHandler} name="device" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="repair">Repair Type</label>
            <input type="text" className="form-control form-control-sm" id="repair" placeholder="Describe the repair..." value={props.repair} onChange={props.inputHandler} name="repair" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="imei">IMEI Number</label>
            <input type="text" className="form-control form-control-sm" id="imei" placeholder="Enter the imei..." value={props.imei} onChange={props.inputHandler} name="imei" />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col-md-6">
          <div className="form-group mb-0">
            <label htmlFor="notes">Notes</label>
            <textarea className="form-control form-control-sm" id="notes" placeholder="Enter any notes..."  value={props.notes} onChange={props.inputHandler} name="notes" rows="4"/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="employee">Employee Assigned</label>
            <select className="form-control form-control-sm my-1" id="employeeFormPick" value={props.employee} onChange={props.inputHandler} name="employee">
              <option>Please select an employee...</option>
              {props.employees.map(employee => <option key={employee._id}>{employee.employeeName}</option>)}
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary btn-sm btn-block mt-md-4" onClick={props.submitHandler}>Submit</button>
          </div>
        </div>
      </div>
    </fieldset >
  </form >
);

export default TaskForm;
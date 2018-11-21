import React from "react";

const CreateEmployeeForm = props => (
  <form>
    <fieldset>
      <legend>New Employee</legend>
      {/* Customer Name */}
      <div className="form-row">
        <div className="col-md-5">
          <div className="form-group">
            <label htmlFor="customerName">Employee Name</label>
            <input type="text" className="form-control form-control-md" id="customerName" placeholder="Customer name..." onChange={props.inputHandler} name="name" />
          </div>
        </div>
        <div className="col-md-5">
          <div className="form-group">
            <label htmlFor="deviceName">Account Password</label>
            <input type="text" className="form-control form-control-md" id="deviceName" placeholder="Device brand and model..." onChange={props.inputHandler} name="password" />
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary btn-md btn-block mt-md-4" onClick={props.submitHandler}>Submit</button>
        </div>
      </div>
    </fieldset >
  </form >
);

export default CreateEmployeeForm;
import React from "react";

const CreateEmployee = props => (
  <form>
    <fieldset>
      {/* Customer Name */}
      <div className="form-row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="customerName">Employee Name</label>
            <input type="text" className="form-control form-control-md" id="customerName" placeholder="Customer name..." onChange={props.inputHandler} name="name" />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="employeePassword">Account Password</label>
            <input type="text" className="form-control form-control-md" id="employeePassword" placeholder="Employee password..." onChange={props.inputHandler} name="password" />
          </div>
        </div>
        <div className="col-md-12">
          <button className="btn btn-primary btn-md btn-block mt-md-4" onClick={props.submitHandler}>Submit</button>
        </div>
      </div>
    </fieldset >
  </form >
);

export default CreateEmployee;
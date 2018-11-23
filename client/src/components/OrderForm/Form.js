import React from "react";

const CreateRequest = props => (
  <form>
    <fieldset>
      <legend>New Order</legend>
      {/* Customer Name */}
      <div className="form-row">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input type="text" className="form-control form-control-md" id="customerName" placeholder="Customer name..." onChange={props.inputHandler} name="customerName" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="partName">Part Name or Number</label>
            <input type="text" className="form-control form-control-md" id="partName" placeholder="Enter name of part..." onChange={props.inputHandler} name="partName" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="partLink">Online Link</label>
            <input type="text" className="form-control form-control-md" id="partLink" placeholder="Any link found online of part needed..." onChange={props.inputHandler} name="partLink" />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="orderMemo">Memo</label>
            <input type="text" className="form-control form-control-md" id="orderMemo" placeholder="Any extra info..." onChange={props.inputHandler} name="orderMemo" />
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary btn-md btn-block mt-md-4" onClick={props.submitHandler}>Submit</button>
        </div>
      </div>
    </fieldset >
  </form >
);

export default CreateRequest;
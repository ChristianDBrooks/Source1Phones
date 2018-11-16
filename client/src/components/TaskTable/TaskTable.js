import React from "react";

const TaskTable = props => (
<table className="table">
  <thead className="text-center">
    <tr>
        <th scope="col">No.</th>
        <th scope="col">Customer Name</th>
        <th scope="col">Device</th>
        <th scope="col">Time In</th>
        <th scope="col">Employee Assigned</th>
        <th></th>
    </tr>
  </thead>
  <tbody className="text-center">
      {props.children}
  </tbody>
</table>
);

export default TaskTable;
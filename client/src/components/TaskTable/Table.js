import React from "react";

const TaskTable = props => (
<table className="table table-sm">
  <thead className="text-center">
    <tr className="bg-dark">
        <th scope="col">No.</th>
        <th />
        <th scope="col">Customer Name</th>
        <th scope="col">Device</th>
        <th scope="col">Repair</th>
        <th scope="col">Time In</th>
        <th scope="col">Employee Assigned</th>
        <th />
    </tr>
  </thead>
  <tbody className="text-center">
      {props.children}
  </tbody>
</table>
);

export default TaskTable;
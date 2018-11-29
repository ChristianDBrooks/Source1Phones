import React from "react";

const TaskTable = props => (
<table className="table table-sm">
  <thead className="text-center">
    <tr className="bg-dark">
        <th scope="col">Date In</th>
        <th scope="col">Time In</th>
        <th scope="col">Customer Name</th>
        <th scope="col">Device</th>
        <th scope="col">IMEI</th>
        <th scope="col">Repair</th>
        <th scope="col">Assigned Employee</th>
        <th scope="col">Completed</th>
    </tr>
  </thead>
  <tbody className="text-center">
      {props.children}
  </tbody>
</table>
);

export default TaskTable;
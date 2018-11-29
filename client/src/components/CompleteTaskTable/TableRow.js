import React from "react";

const TaskTableRow = props => (
    <tr className="bg-light">
        <td>{props.date}</td>
        <td>{props.time}</td>
        <td>{props.name}</td>
        <td>{props.device}</td>
        <td>{props.imei}</td>
        <td>{props.repair}</td>
        <td>{props.employee}</td>
        <td>{props.complete}</td>
    </tr>
);

export default TaskTableRow;
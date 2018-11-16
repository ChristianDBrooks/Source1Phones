import React from "react";

const TaskTableRow = props => (
    <tr>
        <td>{props.priority}</td>
        <td>{props.name}</td>
        <td>{props.device}</td>
        <td>{props.time}</td>
        <td>
            <select className="form-control" id="employee" name="employee">
                {props.employees.map(employee =>
                    employee.employeeName === props.employee ? 
                    <option key={props.employee}>{props.employee}</option> : 
                    <option key={employee.employeeName}>{employee.employeeName}</option>
                    )}
            </select>
        </td>
        <td>
            <button type="button" className="close" onClick={() => props.delete(props.id)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </td>
    </tr>
);

export default TaskTableRow;
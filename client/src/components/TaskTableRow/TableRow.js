import React from "react";

const TaskTableRow = props => (
    <tr className="bg-light">
        <td>{props.priority}</td>
        <td>
            <span className="mr-2" onClick={() => props.goUp(props.id, props.priority)}><i className="fas fa-angle-up fa-lg" /></span>
            <span onClick={() => props.goDown(props.id, props.priority)}><i className="fas fa-angle-down fa-lg" /></span>
        </td>
        <td>{props.name}</td>
        <td>{props.device}</td>
        <td>{props.repair}</td>
        <td>{props.time}</td>
        <td>
            <select className="form-control" id={props.id} name="employee" onChange={props.inputUpdater}>
                <option>Please assign an employee...</option>
                {props.employees.map(employee =>
                    employee.employeeName === props.employee ?
                    <option key={props.employee} selected>{props.employee}</option> : 
                    <option key={employee.employeeName}>{employee.employeeName}</option>
                    )}
            </select>
        </td>
        <td>
            <button type="button" className="bg-transparent border-0" onClick={() => props.complete(props.id)} aria-label="Close">
                <span className="text-secondary" aria-hidden="true"><i className="fas fa-times"></i></span>
            </button>
        </td>
    </tr>
);

export default TaskTableRow;
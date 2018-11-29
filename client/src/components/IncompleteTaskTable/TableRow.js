import React from "react";

const TaskTableRow = props => (
    <tr className="bg-light">

        <td data-toggle="modal" data-target={"#" + props.modalID}>{props.date}</td>
        <td data-toggle="modal" data-target={"#" + props.modalID}>{props.name}</td>
        <td data-toggle="modal" data-target={"#" + props.modalID}>{props.device}</td>
        <td data-toggle="modal" data-target={"#" + props.modalID}>{props.repair}</td>
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
            <button type="button" className="btn btn-sm btn-block btn-primary" onClick={() => props.complete(props.id)} aria-label="Close">COMPLETE</button>
        </td>
    </tr>
);

export default TaskTableRow;
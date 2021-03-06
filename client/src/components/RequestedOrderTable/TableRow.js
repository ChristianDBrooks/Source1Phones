import React from "react";

const OrderTableRow = props => (
    <tr className="bg-light">
        <td>{props.id}</td>
        <td>{props.customerName}</td>
        <td>{props.partName}</td>
        <td>
            <button type="button" className="bg-transparent border-0" onClick={() => props.delete(props.id)} aria-label="Close">
                <span className="text-secondary" aria-hidden="true"><i className="fas fa-times"></i></span>
            </button>
        </td>
    </tr>
);

export default OrderTableRow;
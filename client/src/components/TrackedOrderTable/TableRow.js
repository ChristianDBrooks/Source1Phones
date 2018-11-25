import React from "react";

const OrderTableRow = props => (
    <tr className="bg-light">
        <td>{props.customerName}</td>
        <td>{props.partName}</td>
        <td>{props.status}</td>
        <td>{props.deliveryDate}</td>
        <td>
            <button type="button" className="bg-transparent border-0" onClick={() => props.complete(props.id)} aria-label="Close">
                <span className="text-secondary" aria-hidden="true"><i className="fas fa-times"></i></span>
            </button>
        </td>
    </tr>
);

export default OrderTableRow;
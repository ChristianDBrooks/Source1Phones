import React from "react";

const OrderTableRow = props => (
    <tr className="bg-light">
        <td className="pt-3">{props.customerName}</td>
        <td className="pt-3">{props.partName}</td>
        <td className="pt-3">
            <a href={props.partLink}>
                Reference Link
            </a>
        </td>
        <td className="pt-3">{props.employee}</td>
        <td className="pt-3">
            <select className="form-control" name="selectedCarrier" onChange={props.inputHandler}>
                <option selected>Select carrier...</option>
                <option value="usps">U.S. Postal Service</option>
                <option value="fedex">FedEx</option>
                <option value="ups">UPS</option>
                <option value="dhl_express">DHL Express</option>
                <option value="canada_post">Canada Post</option>
                <option value="australia_post">Australia Post</option>
                <option value="firstmile">First Mile</option>
                <option value="asendia">Asendia</option>
                <option value="ontrac">OnTrac</option>
                <option value="apc">APC</option>
                <option value="newgistics">Newgistics</option>
                <option value="globegistics">Globegistics</option>
                <option value="rr_donnelley">RR Donnelley</option>
                <option value="imex">IMEX</option>
                <option value="access_worldwide">Access Worldwide</option>
                <option value="purolator_ca">Purolator Canada</option>
                <option value="sendle">Sendle</option>
                <option value="stamps_com">Stamps.com</option>
            </select>
        </td>
        <td>
            <input type="text" className="form-control form-control-sm" placeholder="Tracking Number" name="trackingNumber" onChange={props.inputHandler} />
        </td>
        <td>
            <button className="btn btn-sm btn-block btn-primary" onClick={() => props.completeHandler(props.id)}>COMPLETE</button>
        </td>
    </tr>
);

export default OrderTableRow;
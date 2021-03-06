import React from "react";

const OrderTable = props => (
<table className="table table-sm">
  <thead className="text-center">
    <tr className="bg-dark">
        <th scope="col">Customer Name</th>
        <th scope="col">Part Name</th>
        <th scope="col">Status</th>
        <th scope="col">Est. Delivery Date</th>
        <th></th>
    </tr>
  </thead>
  <tbody className="text-center">
      {props.children}
  </tbody>
</table>
);

export default OrderTable;
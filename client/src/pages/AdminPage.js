import React, { Component } from "react";
import employeeAPI from "../utils/api/employeeAPI";
import orderAPI from "../utils/api/orderAPI";
import NavBar from "../components/NavBar/Nav.js";
import EmployeeForm from "../components/EmployeeForm/Form.js"
import AdminOrderTable from "../components/AdminOrderTable/Table.js";
import AdminOrderTableRow from "../components/AdminOrderTable/TableRow.js";
import TrackedOrderTable from "../components/TrackedOrderTable/Table.js";
import TrackedOrderTableRow from "../components/TrackedOrderTable/TableRow.js";

class AdminPage extends Component {
    state = {
        allEmployees: [],
        name: "",
        password: "",
        requestedOrders: [],
        fulfilledOrders: [],
        trackingNumber: "",
        selectedCarrier: "",
    }

    // Do these on start

    componentDidMount() {
        // Get archived tasks.
        // Get Logged in Users
        this.loadUnfulfilledOrders();
        this.loadUpdatedFulfilledOrders();
    }

    // Form Methods

    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log("Changes occuring to ", name);
        console.log(value);
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        // Compile data from set state to send as one body to database create request.
        const compiledData = {
            name: this.state.name,
            password: this.state.password,
        }
        console.log("Compiled Data to be sent...\n\n", compiledData);
        employeeAPI.createEmployee(compiledData).then(() => {
            this.loadAllEmployees();
        })
    }

    // Employee Methods

    loadAllEmployees = () => {
        employeeAPI.getAllEmployees()
            .then((results) => {
                this.setState({ allEmployees: results.data });
            })
    }

    //Order Methods

    loadUnfulfilledOrders = () => {
        orderAPI.getUnfulfilledOrders()
            .then((results) => {
                this.setState({ requestedOrders: results.data });
            })
    }

    loadUpdatedFulfilledOrders = () => {
        orderAPI.updateOrders()
        .then(() => {
            orderAPI.getFulfilledOrders()
                .then((results) => {
                    this.setState({ fulfilledOrders: results.data });
                    console.log(this.state.fulfilledOrders);
                })
        })
    }

    fulfillOrder = (id) => {
        orderAPI.fulfillOrder(id, {
            tracking: this.state.trackingNumber,
            carrier: this.state.selectedCarrier
        })
            .then(() => {
                this.loadUnfulfilledOrders();
                this.loadFulfilledOrders();
            })
    }

    render() {
        return (
            <div style={{ background: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/admin-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <h4>Admin Page</h4>
                        <hr className="bg-light" />
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        <div className="row">
                            <div className="col col-md-6">
                                <EmployeeForm
                                    inputHandler={this.inputChangeHandler}
                                    submitHandler={this.submitFormHandler}
                                />
                            </div>
                            <div className="col col-md-6">
                                <legend>Employee List</legend>
                                <ul className="list-group">
                                    {this.state.allEmployees.map(employee => {
                                        return (<li className="list-group-item" key={employee._id}>{employee.employeeName}</li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        <legend>Order Requests</legend>
                        <div className="table-responsive-md">
                            <AdminOrderTable>
                                {this.state.requestedOrders.map((order, index) =>
                                    <AdminOrderTableRow
                                        key={order._id}
                                        id={order._id}
                                        customerName={order.customerName}
                                        partName={order.partName}
                                        partLink={order.partLink}
                                        employee={order.employee}
                                        inputHandler={this.inputChangeHandler}
                                        completeHandler={this.fulfillOrder}
                                    />
                                )}
                            </AdminOrderTable>
                        </div>
                        <legend>Tracked Orders</legend>
                        <div className="table-responsive-md">
                            <TrackedOrderTable>                        
                                {this.state.fulfilledOrders.map((order, index) => {
                                    let deliveryDate = "N/A";
                                    if (order.estimatedDelivery !== null) {
                                        deliveryDate = order.estimatedDelivery
                                    }
                                    return (
                                        <TrackedOrderTableRow
                                            key={order._id}
                                            id={order._id}
                                            customerName={order.customerName}
                                            partName={order.partName}
                                            status={order.status}
                                            deliveryDate={deliveryDate}
                                            complete={this.completeOrder}
                                        />
                                    )
                                }
                                )}
                            </TrackedOrderTable>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage;
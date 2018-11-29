import React, { Component } from "react";
import moment from "moment";
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
        this.loadFulfilledOrders();
        this.loadUpdatedFulfilledOrders();
        this.loadAllEmployees();
    }

    // Form Methods

    inputChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        // Compile data from set state to send as one body to database create request.
        const compiledData = {
            name: this.state.name,
            password: this.state.password,
        }
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

    deleteEmployee = (id) => {
        employeeAPI.deleteEmployee(id)
            .then(() => {
                this.loadAllEmployees();
            })
    }

    //Order Methods

    loadUnfulfilledOrders = () => {
        orderAPI.getUnfulfilledOrders()
            .then((results) => {
                this.setState({ requestedOrders: results.data });
            })
    }

    loadFulfilledOrders = () => {
        orderAPI.getFulfilledOrders()
            .then((results) => {
                this.setState({ fulfilledOrders: results.data });
            })
    }

    loadUpdatedFulfilledOrders = () => {
        orderAPI.updateOrders()
            .then(() => {
                orderAPI.getFulfilledOrders()
                    .then((results) => {
                        this.setState({ fulfilledOrders: results.data });
                    })
            })
    }

    deleteOrder = (orderID) => {
        orderAPI.deleteOrder(orderID)
            .then(() => this.loadUnfulfilledOrders())
            .then(() => this.loadFulfilledOrders())
    }

    fulfillOrder = (id) => {
        orderAPI.fulfillOrder(id, {
            tracking: this.state.trackingNumber,
            carrier: this.state.selectedCarrier
        })
            .then(() => {
                this.loadUnfulfilledOrders();
                this.loadUpdatedFulfilledOrders();
            })
    }

    render() {
        return (
            <div style={{ background: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/admin-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-3 shadow">
                        <h4 className="m-0">Dashboard</h4>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        <div className="row">
                            <div className="col col-md-6">
                                <legend className="text-center text-md-left">New Employee</legend>
                                <hr className="bg-light" />
                                <EmployeeForm
                                    inputHandler={this.inputChangeHandler}
                                    submitHandler={this.submitFormHandler}
                                />
                            </div>
                            <div className="col col-md-6">
                                <legend className="text-center text-md-left">Employee List</legend>
                                <hr className="bg-light" />
                                <ul className="list-group">
                                    {this.state.allEmployees.map(employee => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between" key={employee._id}>
                                                <span>
                                                    {employee.employeeName}
                                                </span>
                                                <button type="button" className="bg-transparent border-0" onClick={() => this.deleteEmployee(employee._id)} aria-label="Close">
                                                    <span className="text-secondary" aria-hidden="true"><i className="fas fa-times"></i></span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        <div className="d-flex">
                            <legend className="text-center text-md-left">Order Requests</legend>
                            <span onClick={this.loadUnfulfilledOrders}>
                                <i className="fas fa-sync-alt fa-lg py-2"></i>
                            </span>
                        </div>
                        <hr />
                        <div className="table-responsive-md">
                            {!this.state.requestedOrders.length ?
                                (
                                    <div className="text-center">
                                        <h4 className="text-danger mb-0 py-3">NO REQUESTS FOUND</h4>
                                    </div>
                                ) :
                                (<AdminOrderTable>
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
                                </AdminOrderTable>)}
                        </div>
                    </div>
                    <div className="container bg-light my-4 p-4 shadow">
                        <div className="d-flex">
                            <legend className="text-center text-md-left mb-0">Tracked Orders</legend>
                            <span onClick={this.loadUpdatedFulfilledOrders}>
                                <i className="fas fa-sync-alt fa-lg py-2"></i>
                            </span>
                        </div>
                        <hr className="bg-light" />
                        <div className="table-responsive-md">
                            {!this.state.fulfilledOrders.length ?
                                (
                                    <div className="text-center">
                                        <h4 className="text-danger mb-0 py-3">NO ORDERS FOUND</h4>
                                    </div>
                                ) :
                                (<TrackedOrderTable>
                                    {this.state.fulfilledOrders.map((order, index) => {
                                        let deliveryDate = "N/A";
                                        if (order.estimatedDelivery !== null) {
                                            deliveryDate = order.estimatedDelivery;
                                            deliveryDate = moment(deliveryDate).format("MM-DD-YYYY");
                                        } else if (order.actualDelivery !== null) {
                                            deliveryDate = order.actualDelivery.split("T", 1)[0];
                                            deliveryDate = moment(deliveryDate).format("MM-DD-YYYY");
                                        }
                                        return (
                                            <TrackedOrderTableRow
                                                key={order._id}
                                                id={order._id}
                                                customerName={order.customerName}
                                                partName={order.partName}
                                                status={order.status}
                                                deliveryDate={deliveryDate}
                                                delete={this.deleteOrder}
                                            />
                                        )
                                    }
                                    )}
                                </TrackedOrderTable>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminPage;
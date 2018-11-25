import React, { Component } from "react";
import orderAPI from "../utils/api/orderAPI.js";
import OrderForm from "../components/OrderForm/Form"
import NavBar from "../components/NavBar/Nav.js";
import RequestedOrderTable from "../components/RequestedOrderTable/Table.js";
import RequestedOrderTableRow from "../components/RequestedOrderTable/TableRow.js";
import TrackedOrderTable from "../components/TrackedOrderTable/Table.js";
import TrackedOrderTableRow from "../components/TrackedOrderTable/TableRow.js";

class OrderPage extends Component {
    state = {
        unfulfilledOrders: [],
        fulfilledOrders: [],
        customerName: '',
        partName: '',
        partLink: '',
        orderMemo: '',
        employee: sessionStorage.getItem("currentEmployee")
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
    }

    submitFormHandler = (event) => {
        event.preventDefault()
        // Compile data from set state to send as one body to database create request.
        const compiledData = {
            customerName: this.state.customerName,
            partName: this.state.partName,
            partLink: this.state.partLink,
            orderMemo: this.state.orderMemo,
            employee: sessionStorage.getItem("currentEmployee")
        }
        console.log("Compiled Data to be sent...\n\n", compiledData);
        orderAPI.createOrder(compiledData).then(() => {
            this.loadUnfulfilledOrders();
        })
    }

    // Order Methods

    loadUnfulfilledOrders = () => {
        orderAPI.getUnfulfilledOrders()
            .then((results) => {
                this.setState({ unfulfilledOrders: results.data });
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


    deleteOrder = (orderID) => {
        orderAPI.deleteOrder(orderID)
            .then(() => this.loadUnfulfilledOrders())
    }

    render() {
        return (
            <div style={{ backgroundImage: "url(./images/tasks-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <h1>Orders</h1>
                        <hr className="bg-light" />
                        <legend>Order Requests</legend>
                        <RequestedOrderTable>
                            {this.state.unfulfilledOrders.map((order, index) =>
                                <RequestedOrderTableRow
                                    key={order._id}
                                    id={order._id}
                                    customerName={order.customerName}
                                    partName={order.partName}
                                    delete={this.deleteOrder}
                                />
                            )}
                        </RequestedOrderTable>
                        <legend>Fulfilled</legend>
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
                <div className="container bg-light my-4 p-4 shadow">
                    {/* Create Task Form Component */}
                    <OrderForm
                        inputHandler={this.inputChangeHandler}
                        submitHandler={this.submitFormHandler}
                    />
                </div>
            </div>
        )
    }
}

export default OrderPage;
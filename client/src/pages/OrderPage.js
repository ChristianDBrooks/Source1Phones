import React, { Component } from "react";
import moment from "moment";
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
                        console.log(this.state.fulfilledOrders);
                    })
            })
    }


    deleteOrder = (orderID) => {
        orderAPI.deleteOrder(orderID)
            .then(() => this.loadUnfulfilledOrders())
            .then(() => this.loadFulfilledOrders())
    }

    render() {
        return (
            <div style={{ backgroundImage: "linear-gradient(transparent, rgba(26,26,26,.0), rgba(26,26,26,1)), url(./images/order-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div className="container bg-light mt-4 p-3 shadow">
                    <h4 className="m-0">Orders</h4>
                </div>
                <div className="container bg-light mt-4 p-4 shadow">
                    <div className="d-flex">
                        <legend className="text-center text-md-left mb-0">Order Requests</legend>
                        <span onClick={this.loadUnfulfilledOrders}>
                            <i className="fas fa-sync-alt fa-lg py-2"></i>
                        </span>
                    </div>
                    <hr />
                    {!this.state.unfulfilledOrders.length ?
                        (
                            <div className="text-center mb-5">
                                <h4 className="text-danger mb-0">NO REQUESTS FOUND</h4>
                            </div>
                        ) :
                        (<RequestedOrderTable>
                            {this.state.unfulfilledOrders.map((order, index) =>
                                <RequestedOrderTableRow
                                    key={order._id}
                                    id={order._id}
                                    customerName={order.customerName}
                                    partName={order.partName}
                                    delete={this.deleteOrder}
                                />
                            )}
                        </RequestedOrderTable>)}
                    <div className="d-flex">
                        <legend className="text-center text-md-left mb-0">Fulfilled</legend>
                        <span onClick={this.loadFulfilledOrders}>
                            <i className="fas fa-sync-alt fa-lg py-2"></i>
                        </span>
                    </div>
                    <hr />
                    {!this.state.fulfilledOrders.length ?
                        (
                            <div className="text-center">
                                <h4 className="text-danger mb-0">NO ORDERS FOUND</h4>
                            </div>
                        ) :
                        (<TrackedOrderTable>
                            {this.state.fulfilledOrders.map((order, index) => {
                                let deliveryDate = "N/A";
                                if (order.estimatedDelivery !== null) {
                                    deliveryDate = order.estimatedDelivery;
                                    deliveryDate = moment(deliveryDate).format("MM-DD-YYYY");
                                } else if (order.actualDelivery !== null)
                                    deliveryDate = order.actualDelivery.split("T", 1)[0];
                                deliveryDate = moment(deliveryDate).format("MM-DD-YYYY");
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
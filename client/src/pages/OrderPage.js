import React, { Component } from "react";
import orderAPI from "../utils/api/orderAPI.js";
import OrderForm from "../components/OrderForm/Form"
import NavBar from "../components/NavBar/Nav.js";
import OrderTable from "../components/OrderTable/Table.js";
import OrderTableRow from "../components/OrderTableRow/TableRow.js";

class OrderPage extends Component {
    state = {
        orders: [],
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
        this.loadAllOrders();
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
            orderMemo: this.state.orderMemo
        }
        console.log("Compiled Data to be sent...\n\n", compiledData);
        orderAPI.createOrder(compiledData).then(() => {
            this.loadAllOrders();
        })
    }

    // Task Methods

    loadAllOrders = () => {
        orderAPI.getAllOrders()
            .then((results) => {
                this.setState({ orders: results.data });
            })
    }

    deleteOrder = (orderID) => {
        orderAPI.deleteOrder(orderID)
        .then(() => this.loadAllOrders())
    }

    render() {
        return (
            <div style={{ backgroundImage: "url(./images/tasks-bg.jpeg)", backgroundSize: "cover", height: "100vh", backgroundPosition: "center" }}>
                <NavBar />
                <div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <h1>Orders</h1>
                        <hr className="bg-light" />
                    </div>
                    <div className="container bg-light mt-4 p-4 shadow">
                        <OrderTable>
                            {this.state.orders.map((order, index) =>
                                <OrderTableRow
                                    key={order._id}
                                    id={order._id}
                                    customerName={order.customerName}
                                    partName={order.partName}
                                    status={order.status}
                                    deliveryDate={order.estimatedDelivery}
                                    delete={this.deleteOrder}
                                />
                            )}
                        </OrderTable>
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
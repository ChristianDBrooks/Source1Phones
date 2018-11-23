import axios from "axios";

const BASE_URL = "/api/order";

export default {
    // Find all tasks in database.
    getAllOrders: () => {
        return axios.get(BASE_URL);
    },

    createOrder: (data) => {
        // console.log("Sending data", data);
        return axios.post(BASE_URL, data);
    },

    fulfillOrder: (id, orders) => {
        return axios.put(BASE_URL + "/fulfill/" + id, {orders});
    },

    deleteOrder: (id) => {
        console.log(id);
        return axios.delete(BASE_URL + "/" + id);
    }
}
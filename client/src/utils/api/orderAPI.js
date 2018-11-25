import axios from "axios";

const BASE_URL = "/api/order";

export default {
    // Find all tasks in database.
    getAllOrders: () => {
        return axios.get(BASE_URL);
    },

    getUnfulfilledOrders: () => {
        return axios.get(BASE_URL + "/unfulfilled")
    },

    updateOrders: () => {
        return axios.get(BASE_URL + "/update")
    },

    getFulfilledOrders: () => {
        return axios.get(BASE_URL + "/fulfilled")
    },

    createOrder: (data) => {
        // console.log("Sending data", data);
        return axios.post(BASE_URL, data);
    },

    fulfillOrder: (id, trackingData) => {
        return axios.put(BASE_URL + "/fulfill/" + id, trackingData);
    },

    deleteOrder: (id) => {
        console.log(id);
        return axios.delete(BASE_URL + "/" + id);
    }
}
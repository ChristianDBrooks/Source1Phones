import axios from "axios";

const BASE_URL = "/api/message";

export default {
    // Find all tasks in database.
    getAllMessages: () => {
        return axios.get(BASE_URL);
    },

    // Find all tasks in database last 8 hours.
    getMessageHistory: () => {
        return axios.get(BASE_URL + "/history");
    }
}
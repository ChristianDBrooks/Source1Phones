import axios from "axios";

const BASE_URL = "/api/message";

export default {
    // Find all messages in database.
    getAllMessages: () => {
        return axios.get(BASE_URL);
    },

    // Find all messages in database last 8 hours.
    getMessageHistory: () => {
        return axios.get(BASE_URL + "/history");
    }
}
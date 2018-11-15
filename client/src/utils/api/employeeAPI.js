import axios from "axios";

const BASE_URL = "/api/employee";

export default {
    // Find all tasks in database.
    getAllEmployees: () => {
        return axios.get(BASE_URL);
    },

    deleteEmployee: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
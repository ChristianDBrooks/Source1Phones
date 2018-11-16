import axios from "axios";

const BASE_URL = "/api/task";

export default {
    // Find all tasks in database.
    getAllTasks: () => {
        return axios.get(BASE_URL);
    },

    createNewTask: (data) => {
        console.log("Sending data", data);
        return axios.post(BASE_URL, data);
    },

    deleteTask: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
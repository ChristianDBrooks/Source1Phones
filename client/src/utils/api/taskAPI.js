import axios from "axios";

const BASE_URL = "/api/task";

export default {
    // Find all tasks in database.
    getAllTasks: () => {
        return axios.get(BASE_URL);
    },
    deleteTask: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
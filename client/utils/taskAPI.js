import axios from "axios";

const BASE_URL = "http://localhost:3001/api/task/";

export default {
    // Find all tasks in database.
    getAllTasks: () => {
        return axios.get(BASE_URL);
    },
}
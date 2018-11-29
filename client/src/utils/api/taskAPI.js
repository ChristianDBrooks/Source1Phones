import axios from "axios";

const BASE_URL = "/api/task";

export default {
    // Find all tasks in database.
    getAllTasks: () => {
        return axios.get(BASE_URL);
    },

    getCompleteTasks: () => {
        return axios.get(BASE_URL + "/complete");
    },

    getIncompleteTasks: () => {
        return axios.get(BASE_URL + "/incomplete");
    },

    updateEmployee: (id, employeeData) => {
        return axios.put(`${BASE_URL}/employee/${id}`, employeeData);
    },

    createNewTask: (data) => {
        // console.log("Sending data", data);
        return axios.post(BASE_URL, data);
    },

    archiveTask: (id) => {
        return axios.put(BASE_URL + "/archive/" + id);
    },

    deleteTask: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
import axios from "axios";

const BASE_URL = "/api/task";

export default {
    // Find all tasks in database.
    getAllTasks: () => {
        return axios.get(BASE_URL);
    },

    increasePriorityByOne: (id, index, tasks) => {
        return axios.put(`${BASE_URL}/increase/${id}`, {selectedTaskPriority: tasks[index].priority, previousTaskPriority: tasks[index - 1].priority});
    },

    decreasePriorityByOne: (id, index, tasks) => {
        return axios.put(`${BASE_URL}/decrease/${id}`, {selectedTaskPriority: tasks[index].priority, nextTaskPriority: tasks[index + 1].priority});
    },

    updateEmployee: (id, employeeData) => {
        return axios.put(`${BASE_URL}/employee/${id}`, employeeData);
    },

    createNewTask: (data) => {
        // console.log("Sending data", data);
        return axios.post(BASE_URL, data);
    },

    archiveTask: (id, tasks) => {
        return axios.put(BASE_URL + "/archive/" + id, {tasks});
    },

    deleteTask: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
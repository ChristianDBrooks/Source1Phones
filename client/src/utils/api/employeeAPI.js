import axios from "axios";

const BASE_URL = "/api/employee";

export default {
    // Find all tasks in database.
    getAllEmployees: () => {
        return axios.get(BASE_URL);
    },

    getCurrentUser: (employeeID) => {
        return axios.get(BASE_URL + "/user/" + employeeID)
    },

    changeEmployeeOnlineStatus: (employeeID, status) => {
        return axios.put(BASE_URL + "/status/" + employeeID, {status: status})
    },

    checkEmployeeOnlineStatus: (employeeID, status) => {
        return axios.get(BASE_URL + "/status/" + employeeID)
    },

    getOnlineEmployees: () => {
        return axios.get(BASE_URL + "/online");
    },

    getOfflineEmployees: () => {
        return axios.get(BASE_URL + "/offline");
    },

    validateClient: (id, pass) => {
        return axios.post(BASE_URL + "/validate/" + id, {passwordToCheck: pass});
    },

    deleteEmployee: (id) => {
        return axios.delete(BASE_URL + "/" + id);
    }
}
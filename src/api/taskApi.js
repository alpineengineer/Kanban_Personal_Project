import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}
export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
}
export const getColumns = async () => {
    const response = await axios.get("http://localhost:8080/api/columns");
    return response.data;
}
export const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
}
export const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`http://localhost:8080/api/tasks/${taskId}`, taskData);
    return response.data;
}
export const getTaskDetails = async () => {
    const response = await axios.get(`${API_URL}/details`);
    return response.data;
}
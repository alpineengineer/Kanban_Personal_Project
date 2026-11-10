
import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "/api";

const API_URL = `${API_BASE_URL}/tasks`;

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

export const getColumns = async () => {
    const response = await axios.get(`${API_BASE_URL}/columns`);
    return response.data;
};

export const deleteTask = async (taskId) => {
    await axios.delete(`${API_URL}/${taskId}`);
};

export const updateTask = async (taskId, taskData) => {
    const response = await axios.put(`${API_URL}/${taskId}`, taskData);
    return response.data;
};

export const getTaskDetails = async () => {
    const response = await axios.get(`${API_URL}/details`);
    return response.data;
};

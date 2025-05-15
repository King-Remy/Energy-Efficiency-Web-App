import axios from "axios";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const API_URL = "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get("session_token")
    if (token) {
        config.headers.Authorization= `Bearer ${token}`;
    }
    return config;
}, (error) => {Promise.reject(error)}

);

export default axiosInstance;
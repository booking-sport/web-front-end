import axios from "axios";
axios.defaults.withCredentials = true;
const apiClient = axios.create({
  baseURL: "http://192.168.101.4:4000/api", // Thay bằng URL của API
  timeout: 10000, // Thời gian timeout (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default apiClient;

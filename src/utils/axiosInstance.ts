import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://pixzun-ai-server.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
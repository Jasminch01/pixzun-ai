import axios from "axios";
import toast from "react-hot-toast";
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://pixzun-ai-server.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    toast.error(`${err.response.data.message || err.response.data.error}`, {
      duration: 5000,
    });
    console.log(err);
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      window.location.replace("/");
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;

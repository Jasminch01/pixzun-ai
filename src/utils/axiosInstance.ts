import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://pixzunserver-pbg7n4s6.b4a.run",
  // baseURL: "https://pixzun-ai-server.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
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

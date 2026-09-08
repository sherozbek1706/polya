import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Sizning Express serveringiz manzili
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => {
    // To'g'ridan-to'g'ri datani qaytaramiz
    return response.data;
  },
  (error) => {
    console.error("API xatoligi:", error);
    return Promise.reject(error);
  },
);

export default api;

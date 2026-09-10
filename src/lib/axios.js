import axios from "axios";

const api = axios.create({
  baseURL: "http://10.31.2.47:5005/api", // Sizning Express serveringiz manzili
  timeout: 10000,
});

// So'rov (Request) yuborilishidan oldin ishlaydigan interceptor
api.interceptors.request.use(
  (config) => {
    // Brauzerda (client-side) ekanligimizni tekshiramiz
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token"); // Tokenni localStorage'dan olamiz
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Backendga yuboramiz
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API xatoligi:", error);
    return Promise.reject(error);
  },
);

export default api;

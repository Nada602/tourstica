import axios from "axios";

// const getStoredToken = () => {
//   if (typeof window === "undefined") return null;

//   return (
//     localStorage.getItem("token") ||
//     localStorage.getItem("authToken") ||
//     sessionStorage.getItem("token") ||
//     sessionStorage.getItem("authToken")
//   );
// };

const apiClient = axios.create({
  // local url for development and testing, you can change it to your own backend url
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// to do in phase 4
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = getStoredToken();

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token");
//         localStorage.removeItem("authToken");
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("authToken");
//       }
//     }

//     return Promise.reject(error);
//   },
// );

apiClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err.response || err.message || err),
);

export default apiClient;

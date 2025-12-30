import axios from "axios";
import router from "@/router";
import authRoutes from "../router/auth";

const http = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const publicRoutes = [...authRoutes[0].children.map((route) => route.name)];

if (localStorage.getItem("access-token")) {
  const token = localStorage.getItem("access-token");
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const isPublicRoute = publicRoutes.includes(
      router.currentRoute.value.name as string
    );
    const isUnauthorized = error.response && error.response.status === 401;

    if (!isPublicRoute && isUnauthorized) {
      router.push({
        name: "signin",
      });
    }

    return Promise.reject(error);
  }
);

export default http;

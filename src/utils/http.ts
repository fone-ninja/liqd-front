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

// const publicRoutes = [...authRoutes[0].children.map((route) => route.name)];

// http.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const isPublicRoute = publicRoutes.includes(
//       router.currentRoute.value.name as string
//     );
//     const isUnauthorized = error.response && error.response.status === 401;

//     if (!isPublicRoute && isUnauthorized) {
//       console.log(publicRoutes, router.currentRoute.value.name);

//       router.push({
//         name: "signin",
//       });
//     }

//     return Promise.reject(error);
//   }
// );

export default http;

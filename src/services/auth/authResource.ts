import http from "@/utils/http";

export const signin = (user) => {
  return http.post("/login", user).then(({ data }) => data);
};

export const signup = (user) => {
  return http.post("/register", user).then(({ data }) => data);
};

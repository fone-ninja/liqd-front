import http from "@/utils/http";

export const getUser = () => {
  return http.get("/me").then(({ data }) => data);
};

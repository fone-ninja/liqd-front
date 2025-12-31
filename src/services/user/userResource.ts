import http from "@/utils/http";

export const getUser = () => {
  return http.get("/get-user").then(({ data }) => data);
};

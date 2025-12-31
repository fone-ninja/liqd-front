import http from "@/utils/http";
import type {
  UserSigninDTO,
  UserSignupDTO,
  UserSigninResponse,
} from "@/types/auth";

export const signin = (user: UserSigninDTO): Promise<UserSigninResponse> => {
  return http.post("/login", user).then(({ data }) => {
    http.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    return data;
  });
};

export const signup = (user: UserSignupDTO) => {
  return http.post("/register", user).then(({ data }) => data);
};

export const signout = () => {
  return http.post("/logout").then(({ data }) => data);
};

import * as authResource from "@/services/auth/authResource";

export const signin = (user) => {
  return authResource.signin(user);
};

export const signup = (user) => {
  return authResource.signup(user);
};

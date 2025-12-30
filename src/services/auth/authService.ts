import * as authResource from "@/services/auth/authResource";
import type { UserSigninDTO, UserSignupDTO } from "@/types/auth";

export const signin = (user: UserSigninDTO) => {
  return authResource.signin(user);
};

export const signup = (user: UserSignupDTO) => {
  return authResource.signup(user);
};

export const signout = () => {
  return authResource.signout();
};

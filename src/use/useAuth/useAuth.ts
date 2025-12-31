import { computed, reactive } from "vue";
import * as authService from "@/services/auth/authService";
import { userStore } from "@/stores/userStore";
import type { UserSigninDTO, UserSignupDTO } from "@/types/auth";

const userState = userStore();

export default function useAuth() {
  const signin = async (user: UserSigninDTO) => {
    try {
      const data = await authService.signin(user);
      userState.setUser(data.user_info);
      localStorage.setItem("access-token", data.token);
    } catch (error) {
      throw error;
    }
  };

  const signup = async ({ email, name, password }: UserSignupDTO) => {
    try {
      await authService.signup({ email, name, password });
    } catch (error) {
      throw error;
    }
  };

  const signout = async () => {
    try {
      await authService.signout();
      localStorage.removeItem("access-token");
    } catch (error) {
      throw error;
    }
  };

  return {
    signin,
    signup,
    signout,
  };
}

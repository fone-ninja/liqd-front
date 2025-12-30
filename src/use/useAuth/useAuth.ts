import { computed, reactive } from "vue";
import * as authService from "@/services/auth/authService";
import type { UserSigninDTO, UserSignupDTO } from "@/types/auth";

const state = reactive({
  user: {},
  isAuthenticated: false,
});

export default function useAuth() {
  const signin = async (user: UserSigninDTO) => {
    try {
      const data = await authService.signin(user);
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

  const user = computed(() => {
    return state.user;
  });

  return {
    signin,
    signup,
    signout,
  };
}

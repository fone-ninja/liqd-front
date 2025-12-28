import { computed, reactive } from "vue";
import * as authService from "@/services/auth/authService";

const state = reactive({
  user: {},
  isAuthenticated: false,
});

export default function useAuth() {
  const signin = async ({ user }) => {
    try {
      const { data } = await authService.signin(user);

      console.log("autenticado", data);
    } catch (error) {
      throw error;
    }
  };

  const signup = async ({ email, name, password }) => {
    try {
      const { data } = await authService.signup({ email, name, password });

      console.log("registrado", data);
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
  };
}

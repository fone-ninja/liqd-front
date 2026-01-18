import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import * as userService from "@/services/user/userService";
import type { User } from "@/types/user";

export type UserState = {
  user: User | null;
};

export const userStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    getUserIdByToken: () => {
      const storageToken = localStorage.getItem("access-token");

      if (!storageToken) throw Error();

      const decoded = jwtDecode(storageToken);
      return +(decoded.sub as string);
    },
    async getUser() {
      try {
        const { data } = await userService.getUser();
        this.setUser(data);
      } catch (error) {
        throw error;
      }
    },
    setUser(user: User) {
      this.user = user;
    },
  },
  getters: {
    userData: (state) => state.user,
  },
});

import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    routeLoading: false,
  }),
  actions: {
    setLoadingScreen(state: boolean) {
      this.routeLoading = state;
    },
  },
  getters: {
    loadingScreen: (state) => state.routeLoading,
  },
});

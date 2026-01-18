import { defineStore } from "pinia";

const POLLING_DURATION = 12;

export const useUiStore = defineStore("ui", {
  state: () => ({
    routeLoading: false,
    pollingTimeLeft: POLLING_DURATION,
  }),
  actions: {
    setLoadingScreen(state: boolean) {
      this.routeLoading = state;
    },
    setPollingTimeLeft(time: number) {
      this.pollingTimeLeft = time;
    },
  },
  getters: {
    loadingScreen: (state) => state.routeLoading,
    pollingDuration: () => POLLING_DURATION,
  },
});

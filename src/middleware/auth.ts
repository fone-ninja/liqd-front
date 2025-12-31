import { userStore } from "@/stores/userStore";
import { useUiStore } from "@/stores/uiStore";
import type { NavigationGuardNext } from "vue-router";

export default async function auth({ next }: { next: NavigationGuardNext }) {
  const { userData, getUser } = userStore();
  const uiStore = useUiStore();

  if (userData) {
    uiStore.setLoadingScreen(false);
    return next();
  }

  try {
    await Promise.all([getUser()]);
    return next();
  } catch {
    return next({ name: "signin" });
  } finally {
    uiStore.setLoadingScreen(false);
  }
}

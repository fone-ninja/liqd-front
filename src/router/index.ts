import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";
import productRoutes from "./product";
import auth from "@/middleware/auth";
import { useUiStore } from "@/stores/uiStore";

const redirectRoute = {
  path: "/",
  name: "index",
  redirect: `${authRoutes[0].path}/${authRoutes[0].children[0].path}`,
};

const notExistRoute = {
  path: "/:pathMatch(.*)*",
  name: "not-exist",
  redirect: `${productRoutes[0].path}/${productRoutes[0].children[0].path}`,
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [redirectRoute, ...authRoutes, ...productRoutes, notExistRoute],
});

router.beforeEach((to, from, next) => {
  const uiStore = useUiStore();

  const publicRoutes = [...authRoutes[0].children.map((route) => route.name)];

  const isPublicRoute = publicRoutes.includes(to.name as string);

  if (isPublicRoute) {
    next();
  } else {
    uiStore.setLoadingScreen(true);
    auth({ next });
  }
});

export default router;

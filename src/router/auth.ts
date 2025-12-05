const routes = [
  {
    path: "/auth",
    component: () => import("../layouts/PublicLayout.vue"),
    redirect: { name: "signin" },
    children: [
      {
        path: "signin",
        name: "signin",
        component: () => import("../views/auth/Signin.vue"),
      },
      {
        path: "signup",
        name: "signup",
        component: () => import("../views/auth/Signup.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("../views/auth/ForgotPassword.vue"),
      },
      {
        path: "forgot-password-code-sent",
        name: "forgot-password-code-sent",
        component: () => import("../views/auth/ForgotPasswordCodeSent.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("../views/auth/ResetPassword.vue"),
      },
      {
        path: "success",
        name: "success",
        component: () => import("../views/auth/Success.vue"),
      },
    ],
  },
];

export default routes;

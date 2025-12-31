const routes = [
  {
    path: "/app",
    component: () => import("../layouts/PrivateLayout.vue"),
    redirect: { name: "home" },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/home/Home.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/profile/Profile.vue"),
      },
      {
        path: "deposit",
        name: "deposit",
        component: () => import("../views/deposit/Deposit.vue"),
      },
      {
        path: "convert",
        name: "convert",
        component: () => import("../views/convert/Convert.vue"),
      },
      {
        path: "withdraw",
        name: "withdraw",
        component: () => import("../views/withdraw/Withdraw.vue"),
      },
    ],
  },
];

export default routes;

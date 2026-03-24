import asyncComponent from "../utils/asyncComponent.jsx";

export const commonRouters = [
  {
    path: "/connect-metamask",
    component: asyncComponent(() => import("../pages/auth/connectMetamask.jsx")),
  },
  {
    path: "/",
    isBottomNav: true,
    component: asyncComponent(() => import("../pages/main/home.jsx")),
  },
  {
    path: "/team",
    isBottomNav: true,
    component: asyncComponent(() => import("../pages/main/team.jsx")),
  },
  {
    path: "/rank",
    isBottomNav: true,
    component: asyncComponent(() => import("../pages/main/reward.jsx")),
  },
  {
    path: "/board",
    isBottomNav: true,
    component: asyncComponent(() => import("../pages/main/board.jsx")),
  },
];

export const protectedRouters = [
  {
    path: "/assets",
    isBottomNav: true,
    component: asyncComponent(() => import("../pages/main/assets.jsx")),
  },
  {
    path: "/withdraw",
    component: asyncComponent(() => import("../pages/main/claim.jsx")),
  },
  {
    path: "/deposit",
    component: asyncComponent(() => import("../pages/main/invest.jsx")),
  },
  {
    path: "/transaction-logs",
    component: asyncComponent(() => import("../pages/main/transactionHistory.jsx")),
  },
];

export const routers = [...commonRouters, ...protectedRouters];

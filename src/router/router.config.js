import asyncComponent from "../utils/asyncComponent.jsx";
import { GoHome } from "react-icons/go";
import { LiaParachuteBoxSolid } from "react-icons/lia";
import { IoGiftOutline } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export const commonRouters = [
  {
    path: "/login",
    component: asyncComponent(() => import("../pages/auth/Login.jsx")),
  },
  {
    path: "/signup",
    component: asyncComponent(() => import("../pages/auth/Signup.jsx")),
  },
  {
    path: "/forgot-password",
    component: asyncComponent(() => import("../pages/auth/ForgotPassword.jsx")),
  },
  {
    path: "/verify-otp",
    component: asyncComponent(() => import("../pages/auth/verifyOtp.jsx")),
  },
  {
    path: "/connect-metamask",
    component: asyncComponent(() => import("../pages/auth/connectMetamask.jsx")),
  },
  {
    path: "/",
    isBottomNav: true,
    label: "HOME",
    icon: GoHome,
    component: asyncComponent(() => import("../pages/main/home.jsx")),
  },
  {
    path: "/team",
    isBottomNav: true,
    label: "TEAM",
    icon: LiaParachuteBoxSolid,
    component: asyncComponent(() => import("../pages/main/team.jsx")),
  },
  {
    path: "/reward",
    isBottomNav: true,
    label: "REWARD",
    icon: IoGiftOutline,
    component: asyncComponent(() => import("../pages/main/reward.jsx")),
  },
  {
    path: "/board",
    isBottomNav: true,
    label: "BOARD",
    icon: FaRankingStar,
    component: asyncComponent(() => import("../pages/main/board.jsx")),
  },
];

export const protectedRouters = [
  {
    path: "/assets",
    isBottomNav: true,
    label: "ASSETS",
    icon: CgProfile,
    component: asyncComponent(() => import("../pages/main/assets.jsx")),
  },
  {
    path: "/claim",
    component: asyncComponent(() => import("../pages/main/claim.jsx")),
  },
  {
    path: "/invest",
    component: asyncComponent(() => import("../pages/main/invest.jsx")),
  },
];

export const authRouters = commonRouters;
export const routers = [...commonRouters, ...protectedRouters];

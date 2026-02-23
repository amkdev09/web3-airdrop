import asyncComponent from "../utils/asyncComponent.jsx";
import { GoHome } from "react-icons/go";
import { LiaParachuteBoxSolid } from "react-icons/lia";
import { IoGiftOutline } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export const authRouters = [
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
];

export const protectedRouters = [
  {
    path: "/",
    isBottomNav: true,
    label: "HOME",
    icon: GoHome,
    component: asyncComponent(() => import("../pages/main/home.jsx")),
  },
  {
    path: "/airdrop",
    isBottomNav: true,
    label: "AIRDROP",
    icon: LiaParachuteBoxSolid,
    component: asyncComponent(() => import("../pages/main/airdrop.jsx")),
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
  {
    path: "/profile",
    isBottomNav: true,
    label: "PROFILE",
    icon: CgProfile,
    component: asyncComponent(() => import("../pages/main/profile.jsx")),
  },
];

export const routers = [...authRouters, ...protectedRouters];

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
} from "@mui/material";
import { protectedRouters } from "../../router/router.config";
import { AppColors } from "../../constant/appColors";

const BottomNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const NAV_ITEMS = protectedRouters?.filter((item) => item.isBottomNav)?.map((item) => ({
    path: item.path,
    label: item.label,
    Icon: item.icon,
  }));

  const getValue = () => {
    const exactIndex = NAV_ITEMS.findIndex((item) => item.path === pathname);
    if (exactIndex >= 0) return exactIndex;
    return 0;
  };

  return (
    <Box
      className="py-2"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#1a1a52",
        borderTop: `1px solid rgba(255,255,255,0.06)`,
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xs">
        <BottomNavigation
          value={getValue()}
          onChange={(_, newValue) => {
            const item = NAV_ITEMS[newValue];
            if (item?.path) navigate(item.path);
          }}
          showLabels
          className="gap-1.5"
          sx={{
            transform: "none",
            backgroundColor: "transparent",
            "& .MuiBottomNavigationAction-root": {
              color: AppColors.TXT_SUB,
              minWidth: 56,
              paddingTop: 0.5,
            },
            "& .MuiBottomNavigationAction-root.Mui-selected": {
              color: AppColors.TXT_MAIN,
            },
            "& .MuiBottomNavigationAction-root.Mui-selected .MuiBottomNavigationAction-icon": {
              transform: "none",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "var(--text-xs)",
            },
            "& .MuiBottomNavigationAction-icon": {
              overflow: "visible",
              transform: "none",
              fontSize: "var(--text-2xl)",
            },
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.Icon;
            return (
              <BottomNavigationAction
                key={item.path}
                label={item.label}
                className="gap-1.5"
                icon={
                  <Icon style={{ fontSize: "var(--text-2xl)" }} />
                }
              />
            );
          })}
        </BottomNavigation>
      </Container>
    </Box>
  );
};

export default BottomNavigate;

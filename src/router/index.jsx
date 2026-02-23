import React, { memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import AppLayout from "../layout";
import { authRouters, protectedRouters } from "./router.config";

const AppRouter = () => {

  return (
    <div className="min-h-screen h-full relative overflow-hidden ">
      <div className="absolute -z-10 -top-[200px] -left-[420px] size-200 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(45,239,216,0.45)_0%,rgba(118,33,220,0.018)_75%,rgba(105,21,206,0)_100%)]" />
      <div className="absolute -z-10 -bottom-[200px] -right-[450px] size-200 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(160,86,255,0.45)_0%,rgba(118,33,220,0.018)_75%,rgba(105,21,206,0)_100%)]" />
      <Routes>
        {authRouters.map(({ path, component }) => (
          <Route
            key={path}
            path={path}
            element={
              component ? React.createElement(component) : <Navigate to="/" replace />
            }
          />
        ))}
        {protectedRouters.map(({ path, component, isBottomNav }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <AppLayout isBottomNav={isBottomNav}>
                  {component ? React.createElement(component) : <Navigate to="/" replace />}
                </AppLayout>
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default memo(AppRouter);

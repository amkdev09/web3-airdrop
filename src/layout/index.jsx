import React from "react";
import BottomNavigate from "./footer/bottomNavigate";

const AppLayout = (props) => {
  const { children, isBottomNav = false } = props;

  return (
    <section className="mb-32">
      {children}
      {isBottomNav && <BottomNavigate />}
    </section>
  )
};

export default AppLayout;

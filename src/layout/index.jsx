import React from "react";
import BottomNavigate from "./footer/bottomNavigate";

const AppLayout = (props) => {
  const { children, isBottomNav = false } = props;

  return (
    <React.Fragment>
      <div
        className="max-w-120 w-full mx-auto pt-12 px-4"
      >
        {children}
      </div>
      {isBottomNav && <BottomNavigate />}
    </React.Fragment>
  )
};

export default AppLayout;

import React from "react";
import Header from "../../components/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

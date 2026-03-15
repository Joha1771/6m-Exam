import React from "react";
import MobileNavbar from "../Components/Navbar/MobileNavbar/MobileNavbar";
import { Outlet } from "react-router-dom";
import MobileFooter from "../Components/Footer/MobileFooter";

const MainLayout = () => {
  return (
    <>
      <MobileNavbar />
      <Outlet />
      <MobileFooter />
    </>
  );
};

export default MainLayout;

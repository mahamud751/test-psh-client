import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navmenu from "../components/shared/NavMenu";
import Footer from "../components/shared/Footer";
import { useSelector } from "react-redux";

const Main = () => {
  const location = useLocation();
  const isProfileMenu = useSelector(
    (state) => state?.profileMenu?.isProfileMenu
  );
  const noHeaderFooter =
    location.pathname.includes("signin") ||
    location.pathname.includes("signup");
  return (
    <div>
      {isProfileMenu ? "" : noHeaderFooter || <Navmenu></Navmenu>}

      <div className="custom-container sm:p-2 md:p-0">
        <Outlet></Outlet>
      </div>

      <div>{isProfileMenu ? "" : noHeaderFooter || <Footer></Footer>}</div>
    </div>
  );
};

export default Main;

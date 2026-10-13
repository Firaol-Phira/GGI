import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader/MainHeader.jsx"; // Your main landing nav bar
import MainFooter from "./MainFooter/MainFooter.jsx"; // Your standard website footer

function MainLayout() {
  return (
    <div className="main-layout-container">
      <MainHeader />

      {/* Home, Academy, and Courses pages will load right here */}
      <main className="content-fluid">
        <Outlet />
      </main>

      <MainFooter />
    </div>
  );
}

export default MainLayout;

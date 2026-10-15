// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AuthHeader from "./AuthHeader/AuthHeader.jsx"; // Your sign-in style header
import AuthFooter from "./AuthFooter/AuthFooter.jsx"; // Your sign-in style footer

function AuthLayout() {
  return (
    <div className="auth-layout-wrapper">
      <AuthHeader />

      {/* The matching page component drops in right here */}
      <main className="auth-content-area">
        <Outlet />
      </main>

      <AuthFooter />
    </div>
  );
}

export default AuthLayout;

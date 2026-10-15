import React from "react";
import { Link } from "react-router-dom";
import "./AuthHeader.css";

function AuthHeader() {
  return (
    <header className=" sticky-top auth-header py-3 bg-white border-bottom shadow-sm">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Left: Brand Name in Deep Navy */}
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-extrabold text-navy tracking-wide">
              GGI
            </span>
          </Link>

          {/* Right: Home Icon */}
          <Link
            to="/"
            className="home-icon-btn d-flex align-items-center justify-content-center rounded-circle text-navy"
            title="Go to Home Page"
          >
            <i className="bi bi-house-door-fill fs-5"></i>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default AuthHeader;

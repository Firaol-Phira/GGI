import React from "react";
import "./AuthFooter.css";

function AuthFooter() {
  return (
    <footer className="auth-footer py-4 mt-auto">
      <div className="py-2 container text-center">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          {/* Institutional Copyright */}
          <p className="fs-8 text-light opacity-75 mb-0">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-gold fw-semibold">
              Goal Gate Institution (GGI)
            </span>
            . All rights reserved.
          </p>

          {/* Secure System Badge */}
          <div className="d-flex align-items-center gap-2 fs-8 text-light opacity-75">
            <i className="bi bi-shield-lock-fill text-emerald"></i>
            <span>Secured CBE Financial Portal & Audit Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AuthFooter;

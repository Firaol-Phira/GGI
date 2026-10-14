import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { API_ENDPOINTS } from "../config/apiConfig";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mode state: 'login' | 'signup'
  const [activeTab, setActiveTab] = useState("login");

  // Sign In Form State (Email + Password)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Sign Up Form State (Name + Email + Password)
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  // --- BACKEND-READY SIGN IN SUBMISSION ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      /* 
        ====================================================
        FUTURE BACKEND INTEGRATION CODE:
        ====================================================
        const response = await fetch(API_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");
        login(data.user);
      */

      // Simulated Delay (Remove when connecting real backend API)
      await new Promise((resolve) => setTimeout(resolve, 800));
      const emailLower = loginData.email.trim().toLowerCase();

      let authenticatedUser;
      if (emailLower.includes("admin") || emailLower === "board@goalgate.org") {
        authenticatedUser = {
          id: "GGI-ADM-001",
          name: "Board Chairman",
          email: loginData.email,
          role: "admin",
        };
      } else {
        authenticatedUser = {
          id: "GGI-MBR-102",
          name: "GGI Active Member",
          email: loginData.email,
          role: "member",
        };
      }

      login(authenticatedUser);
      setIsLoading(false);

      if (authenticatedUser.role === "admin") {
        navigate("/admin/gateway");
      } else {
        navigate("/member/dashboard");
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || "Authentication error. Please try again.");
    }
  };

  // --- BACKEND-READY SIGN UP SUBMISSION ---
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      /* 
        ====================================================
        FUTURE BACKEND INTEGRATION CODE:
        ====================================================
        const response = await fetch(API_ENDPOINTS.REGISTER, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");
      */

      // Simulated Delay (Remove when connecting real backend API)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      setSuccessMessage(
        "Account registered successfully! You can now sign in.",
      );
      setActiveTab("login"); // Automatically switch back to sign in tab
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-page min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            {/* Main Card */}
            <div className="login-card p-4 p-md-5 rounded-4 shadow-lg bg-white border-0">
              {/* Header & Logo */}
              <div className="text-center mb-4">
                <Link
                  to="/"
                  className="text-decoration-none d-inline-block mb-1"
                >
                  <span className="fs-2 fw-bold text-navy tracking-wide">
                    GGI
                  </span>
                </Link>
                <h3 className="fw-bold text-navy mb-1">
                  {activeTab === "login" ? "Welcome Back" : "Create Account"}
                </h3>
                <p className="text-muted fs-6 mb-3">
                  {activeTab === "login"
                    ? "Sign in to access your portal space"
                    : "Register to join Goal Gate Institution"}
                </p>

                {/* Tab Switcher Buttons */}
                <div className="p-1 rounded-pill bg-offwhite d-flex gap-1 border border-light-subtle">
                  <button
                    onClick={() => {
                      setActiveTab("login");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className={`btn w-50 rounded-pill fw-bold py-2 fs-7 transition-all ${
                      activeTab === "login"
                        ? "btn-navy text-gold shadow-sm"
                        : "btn-light text-muted"
                    }`}
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("signup");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className={`btn w-50 rounded-pill fw-bold py-2 fs-7 transition-all ${
                      activeTab === "signup"
                        ? "btn-navy text-gold shadow-sm"
                        : "btn-light text-muted"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Error Alert Display */}
              {errorMessage && (
                <div className="alert alert-danger rounded-3 py-2 px-3 fs-7 mb-4 d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill me-2 fs-6"></i>
                  <div>{errorMessage}</div>
                </div>
              )}

              {/* Success Alert Display */}
              {successMessage && (
                <div className="alert alert-success rounded-3 py-2 px-3 fs-7 mb-4 d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2 fs-6 text-emerald"></i>
                  <div>{successMessage}</div>
                </div>
              )}

              {/* FORM 1: SIGN IN (Email + Password) */}
              {activeTab === "login" ? (
                <form
                  onSubmit={handleLoginSubmit}
                  className="d-flex flex-column gap-3"
                >
                  <div>
                    <label className="form-label fw-semibold text-navy fs-7 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input py-2 px-3"
                      placeholder="name@example.com"
                      required
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label fw-semibold text-navy fs-7 mb-0">
                        Password *
                      </label>
                      <a
                        href="#forgot"
                        className="text-emerald fs-7 text-decoration-none fw-semibold"
                      >
                        Forgot?
                      </a>
                    </div>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control custom-input py-2 px-3"
                        placeholder="Enter password"
                        required
                        value={loginData.password}
                        onChange={handleLoginChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary custom-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-navy-gold w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></span>
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right fs-5"></i>
                          Sign In
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* FORM 2: SIGN UP (Name + Email + Password) */
                <form
                  onSubmit={handleSignupSubmit}
                  className="d-flex flex-column gap-3"
                >
                  <div>
                    <label className="form-label fw-semibold text-navy fs-7 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control custom-input py-2 px-3"
                      placeholder="e.g., Abebe Bikila"
                      required
                      value={signupData.fullName}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold text-navy fs-7 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input py-2 px-3"
                      placeholder="name@example.com"
                      required
                      value={signupData.email}
                      onChange={handleSignupChange}
                    />
                  </div>

                  <div>
                    <label className="form-label fw-semibold text-navy fs-7 mb-1">
                      Password *
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="form-control custom-input py-2 px-3"
                        placeholder="Create password"
                        required
                        value={signupData.password}
                        onChange={handleSignupChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary custom-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-emerald-action w-100 py-3 rounded-pill fw-bold text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                          ></span>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-check-fill fs-5"></i>
                          Create Account
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Card Footer */}
              <div className="text-center mt-4 pt-3 border-top border-light-subtle fs-7 text-muted">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-gold fw-bold text-decoration-none ms-1"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

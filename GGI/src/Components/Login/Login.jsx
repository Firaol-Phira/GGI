import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in.");
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on user role
      if (data.user.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/MemberDashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page min-vh-100 d-flex flex-column">
    

      {/* Main Form Container */}
      <div className="container my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="login-card bg-offwhite p-4 p-md-5 rounded-4 shadow-lg">
              {/* Form Header */}
              <div className="text-center mb-4">
                <div className="badge bg-gold text-navy px-3 py-2 rounded-pill mb-2 fw-bold fs-7 tracking-wide">
                  GGI SECURE PORTAL
                </div>
                <h2 className="text-navy fw-bold mb-1">Welcome Back</h2>
                <p className="text-muted fs-7">
                  Sign in to access your member dashboard and contribution
                  records.
                </p>
              </div>

              {/* Error Alert Display */}
              {error && (
                <div className="alert alert-danger py-2 fs-7 mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin}>
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control custom-input border-start-0 border-end-0 ps-0 shadow-none"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn custom-password-toggle bg-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-navy-gold w-100 py-2.5 fw-semibold shadow-sm mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Authenticating...
                    </span>
                  ) : (
                    "Sign In to Portal"
                  )}
                </button>

                {/* Registration Switch Link */}
                <div className="text-center pt-2 border-top border-light">
                  <p className="fs-7 text-muted mb-0">
                    Don't have a member account?{" "}
                    <Link
                      to="/Signup"
                      className="text-emerald fw-bold text-decoration-none"
                    >
                     Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

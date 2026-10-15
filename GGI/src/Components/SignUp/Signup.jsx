import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page min-vh-100 d-flex flex-column">
      {/* Main Registration Container */}
      <div className="container my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="register-card bg-offwhite p-4 p-md-5 rounded-4 shadow-lg">
              {/* Card Header */}
              <div className="text-center mb-4">
                <div className="badge bg-gold text-navy px-3 py-2 rounded-pill mb-2 fw-bold fs-7 tracking-wide">
                  JOIN GGI
                </div>
                <h2 className="text-navy fw-bold mb-1">
                  Create Member Account
                </h2>
                <p className="text-muted fs-7">
                  Register your account to access your financial records and
                  submit CBE payments.
                </p>
              </div>

              {/* Status Notifications */}
              {error && (
                <div className="alert alert-danger py-2 fs-7 mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}

              {success && (
                <div
                  className="alert alert-success py-2 fs-7 mb-3"
                  role="alert"
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRegister}>
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
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

                {/* Password */}
                <div className="mb-3">
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
                      placeholder="Create a strong password"
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

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-shield-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
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
                      Saving to Database...
                    </span>
                  ) : (
                    "Register Account"
                  )}
                </button>

                {/* Login Navigation Link */}
                <div className="text-center pt-2 border-top border-light">
                  <p className="fs-7 text-muted mb-0">
                    Already registered?{" "}
                    <Link
                      to="/login"
                      className="text-emerald fw-bold text-decoration-none"
                    >
                      Sign In Here
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

export default Signup;

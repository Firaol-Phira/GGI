import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./SubmitContribution.css";

function SubmitContribution() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "CBE (Commercial Bank of Ethiopia)",
    transactionReference: "",
    receiptUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/contributions/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: Number(formData.amount),
            paymentDate: formData.paymentDate,
            paymentMethod: formData.paymentMethod,
            transactionReference: formData.transactionReference,
            receiptUrl: formData.receiptUrl,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit contribution.");
      }

      setSuccess("Contribution receipt submitted successfully! Redirecting...");
      setTimeout(() => navigate("/MemberDashboard"), 1800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-page min-vh-100 d-flex flex-column">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-navy fs-4">
            GGI <span className="text-gold fs-6 fw-normal">Member Portal</span>
          </span>
          <Link
            to="/MemberDashboard"
            className=" btn-outline-navy btn-sm rounded-pill px-3"
          >
            <i className="bi bi-arrow-left me-1"></i> Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content Form */}
      <div className="container my-auto py-5 flex-grow-1 d-flex justify-content-center">
        <div className="card shadow-sm border-0 rounded-4 p-4 p-sm-5 w-100 submit-card bg-white">
          <div className="text-center mb-4">
            <span className="badge bg-gold text-navy px-3 py-1 rounded-pill fw-bold fs-8 mb-2">
              FINANCIAL AUDIT SUBMISSION
            </span>
            <h2 className="fw-bold text-navy fs-3">Submit CBE Payment</h2>
            <p className="text-muted fs-7 mb-0">
              Provide your Commercial Bank of Ethiopia (CBE) transaction details
              for committee verification.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 fs-7 mb-3" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2 fs-7 mb-3" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Amount */}
            <div className="mb-3">
              <label className="form-label fw-bold text-navy fs-7">
                Contribution Amount (ETB)
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light fw-bold text-navy">
                  ETB
                </span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="1000.00"
                  required
                />
              </div>
            </div>

            {/* Payment Date */}
            <div className="mb-3">
              <label className="form-label fw-bold text-navy fs-7">
                Payment Date
              </label>
              <input
                type="date"
                className="form-control"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                required
              />
              <span className="form-text fs-8 text-muted d-block mt-1">
                Submissions made between 1st–5th of the month are logged as{" "}
                <strong>On-Time</strong>.
              </span>
            </div>

            {/* Payment Channel */}
            <div className="mb-3">
              <label className="form-label fw-bold text-navy fs-7">
                Payment Channel
              </label>
              <select
                className="form-select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="CBE (Commercial Bank of Ethiopia)">
                  CBE (Commercial Bank of Ethiopia)
                </option>
                <option value="CBE Birr">CBE Birr</option>
                <option value="Telebirr">Telebirr</option>
                <option value="Direct Bank Transfer">
                  Direct Bank Transfer
                </option>
              </select>
            </div>

            {/* CBE Transaction Reference */}
            <div className="mb-3">
              <label className="form-label fw-bold text-navy fs-7">
                CBE Transaction Reference
              </label>
              <input
                type="text"
                className="form-control font-monospace"
                name="transactionReference"
                value={formData.transactionReference}
                onChange={handleChange}
                placeholder="e.g. FT26095ABC123"
                required
              />
            </div>

            {/* CBE Digital Receipt Link */}
            <div className="mb-4">
              <label className="form-label fw-bold text-navy fs-7">
                CBE Receipt Link or Image URL
              </label>
              <input
                type="url"
                className="form-control"
                name="receiptUrl"
                value={formData.receiptUrl}
                onChange={handleChange}
                placeholder="https://mbreciept.cbe.com.et/v2-XXXXXX"
              />
              <span className="form-text fs-8 text-muted d-block mt-1">
                Paste the direct <code>mbreciept.cbe.com.et</code> link from
                your CBE Mobile App for immediate audit confirmation.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className=" btn-emerald w-100 py-2 fw-bold text-white rounded-pill shadow-sm"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Submitting Payment...
                </>
              ) : (
                "Submit Contribution Receipt"
              )}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default SubmitContribution;

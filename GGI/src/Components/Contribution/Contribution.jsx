import React, { useState, useEffect } from "react";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import "./SubmitContribution.css";

function SubmitContribution() {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [paymentMethod, setPaymentMethod] = useState(
    "CBE (Commercial Bank of Ethiopia)",
  );
  const [transactionReference, setTransactionReference] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  const [isOnTime, setIsOnTime] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Dynamically evaluate Audit Window (1st - 5th of the selected month)
  useEffect(() => {
    if (paymentDate) {
      const day = new Date(paymentDate).getDate();
      setIsOnTime(day >= 1 && day <= 5);
    }
  }, [paymentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setError(
        "Authentication required. Please sign in to submit a contribution.",
      );
      setLoading(false);
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
            amount: parseFloat(amount),
            paymentDate,
            paymentMethod,
            transactionReference,
            receiptUrl,
          }),
        },
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Unable to connect to the GGI server. Please check your backend.",
        );
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit contribution.");
      }

      setSuccess(data.message);
      // Reset form
      setAmount("");
      setTransactionReference("");
      setReceiptUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contribution-page min-vh-100 d-flex flex-column">
      {/* Top Header */}
      <AuthHeader />

      {/* Main Submission Container */}
      <div className="container my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="contribution-card bg-offwhite p-4 p-md-5 rounded-4 shadow-lg">
              {/* Card Header */}
              <div className="text-center mb-4">
                <div className="badge bg-gold text-navy px-3 py-2 rounded-pill mb-2 fw-bold fs-7 tracking-wide">
                  GGI FINANCIAL AUDIT GATEWAY
                </div>
                <h2 className="text-navy fw-bold mb-1">
                  Submit CBE Contribution
                </h2>
                <p className="text-muted fs-7">
                  Submit your payment transaction details for administrative
                  auditing and official receipt generation.
                </p>
              </div>

              {/* Dynamic Audit Window Notice */}
              <div
                className={`audit-badge-banner p-3 rounded-3 mb-4 text-center border ${
                  isOnTime
                    ? "bg-emerald-subtle border-emerald text-emerald-dark"
                    : "bg-warning-subtle border-warning text-dark"
                }`}
              >
                <div className="d-flex align-items-center justify-content-center gap-2 fw-bold fs-7">
                  <i
                    className={`bi ${isOnTime ? "bi-check-circle-fill text-emerald" : "bi-exclamation-triangle-fill text-warning"}`}
                  ></i>
                  <span>
                    {isOnTime
                      ? "On-Time Window Active (1st–5th of the month)"
                      : "Late Submission Flagged (Outside 1st–5th audit window)"}
                  </span>
                </div>
              </div>

              {/* Status Alerts */}
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

              {/* Submission Form */}
              <form onSubmit={handleSubmit}>
                {/* Amount (ETB) */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Contribution Amount (ETB)
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy fw-bold border-end-0">
                      ETB
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="e.g. 500.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Payment Date */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Payment Date
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-calendar-event"></i>
                    </span>
                    <input
                      type="date"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      value={paymentDate}
                      onChange={(e) => setPaymentDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Payment Channel / Method */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Payment Channel
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-bank"></i>
                    </span>
                    <select
                      className="form-select custom-input border-start-0 ps-0 shadow-none text-navy"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="CBE (Commercial Bank of Ethiopia)">
                        CBE (Commercial Bank of Ethiopia)
                      </option>
                      <option value="CBE Birr App">CBE Birr App</option>
                      <option value="Direct Bank Transfer">
                        Direct Bank Transfer
                      </option>
                    </select>
                  </div>
                </div>

                {/* CBE Transaction Reference */}
                <div className="mb-3">
                  <label className="form-label text-navy fw-semibold fs-7">
                    CBE Transaction Reference / FT Ref
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-receipt-cutoff"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="e.g. FT24095XXXXX"
                      value={transactionReference}
                      onChange={(e) => setTransactionReference(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Receipt Image URL / Cloud Reference */}
                <div className="mb-4">
                  <label className="form-label text-navy fw-semibold fs-7">
                    Receipt URL / Screenshot Link{" "}
                    <span className="text-muted fw-normal">(Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white text-navy border-end-0">
                      <i className="bi bi-link-45deg"></i>
                    </span>
                    <input
                      type="url"
                      className="form-control custom-input border-start-0 ps-0 shadow-none"
                      placeholder="https://..."
                      value={receiptUrl}
                      onChange={(e) => setReceiptUrl(e.target.value)}
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
                      Submitting for Verification...
                    </span>
                  ) : (
                    "Submit Contribution Receipt"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <AuthFooter />
    </div>
  );
}

export default SubmitContribution;

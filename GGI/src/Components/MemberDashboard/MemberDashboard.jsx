import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MemberDashboard.css";
import AuthFooter from "../../Layouts/AuthLayouts/AuthFooter/AuthFooter";

function MemberDashboard() {
  const [user, setUser] = useState({ name: "Member", email: "" });
  const [contributions, setContributions] = useState([]);
  const [activeTab, setActiveTab] = useState("monthly"); // Tab state: 'monthly' or 'yearly'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchMemberHistory(token);
  }, [navigate]);

  const fetchMemberHistory = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/contributions/my-history",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Unable to connect to the backend server.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch contribution history.",
        );
      }

      setContributions(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filter contributions by tab type
  const filteredContributions = contributions.filter((c) => {
    const type = c.payment_type || "monthly"; // fallback if null
    return type === activeTab;
  });

  // Calculate stats
  const totalContributed = contributions
    .filter((c) => c.status === "approved")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const onTimeCount = contributions.filter((c) => c.is_on_time).length;

  return (
    <div className="dashboard-page min-vh-100 d-flex flex-column">
      {/* Top Navigation Bar */}
      <nav className="sticky-top dashboard-navbar navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-extrabold text-navy fs-4 tracking-wide">
            GGI <span className="text-gold fw-normal fs-6">Member Portal</span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <span className="d-block fw-bold text-navy fs-7">
                {user.name}
              </span>
              <span className="d-block text-muted fs-8">Verified Member</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-1"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="container my-4 flex-grow-1">
        {/* Welcome Banner */}
        <div className="welcome-banner p-4 rounded-4 text-white mb-4 shadow-sm position-relative overflow-hidden">
          <div className="position-relative z-index-1">
            <span className="badge bg-gold text-navy px-3 py-1.5 rounded-pill fw-bold fs-8 mb-2">
              GOAL GATE INSTITUTION
            </span>
            <h1 className="fw-bold fs-3 mb-1">Welcome back, {user.name}!</h1>
            <p className="text-light opacity-75 fs-7 mb-3">
              Track your cooperative contributions, verify audit windows, and
              manage CBE payment receipts securely.
            </p>
            <Link
              to="/submit-contribution"
              className="btn btn-gold-navy px-4 py-2 fw-bold fs-7 shadow-sm d-inline-flex align-items-center gap-2 text-decoration-none"
            >
              <i className="bi bi-plus-circle-fill"></i>
              <span>Submit New Contribution</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="stat-card bg-white p-3 rounded-4 shadow-sm border-start border-4 border-emerald">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="d-block text-muted fs-8 fw-semibold uppercase">
                    Approved Contributions
                  </span>
                  <h3 className="text-navy fw-bold mb-0 mt-1">
                    ETB {totalContributed.toFixed(2)}
                  </h3>
                </div>
                <div className="stat-icon bg-emerald-subtle text-emerald rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-cash-stack fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="stat-card bg-white p-3 rounded-4 shadow-sm border-start border-4 border-gold">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="d-block text-muted fs-8 fw-semibold uppercase">
                    On-Time Submissions
                  </span>
                  <h3 className="text-navy fw-bold mb-0 mt-1">
                    {onTimeCount} Records
                  </h3>
                </div>
                <div className="stat-icon bg-gold-subtle text-gold rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-clock-history fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="stat-card bg-white p-3 rounded-4 shadow-sm border-start border-4 border-navy">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="d-block text-muted fs-8 fw-semibold uppercase">
                    Total Receipts Logged
                  </span>
                  <h3 className="text-navy fw-bold mb-0 mt-1">
                    {contributions.length} Records
                  </h3>
                </div>
                <div className="stat-icon bg-navy-subtle text-navy rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-receipt fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution History Section */}
        <div className="history-section bg-white p-4 rounded-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
            <div>
              <h4 className="text-navy fw-bold mb-1">
                Contribution History & Finance Status
              </h4>
              <p className="text-muted fs-7 mb-0">
                Real-time tracking of your submitted CBE payment receipts.
              </p>
            </div>
            <Link
              to="/SubmitContribution"
              className="btn btn-outline-navy btn-sm px-3 fw-semibold fs-7"
            >
              + Submit New
            </Link>
          </div>

          {/* Payment Type Tab Switcher */}
          <ul className="nav nav-pills custom-tabs mb-4 gap-2 border-bottom pb-3">
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill fw-bold px-4 py-2 fs-7 ${
                  activeTab === "monthly"
                    ? "bg-navy text-gold shadow-sm"
                    : "bg-light text-muted"
                }`}
                onClick={() => setActiveTab("monthly")}
              >
                <i className="bi bi-calendar-month me-1"></i> Monthly
                Contributions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill fw-bold px-4 py-2 fs-7 ${
                  activeTab === "yearly"
                    ? "bg-navy text-gold shadow-sm"
                    : "bg-light text-muted"
                }`}
                onClick={() => setActiveTab("yearly")}
              >
                <i className="bi bi-calendar-check me-1"></i> Yearly / Quarterly
                Contributions
              </button>
            </li>
          </ul>

          {error && (
            <div className="alert alert-danger py-2 fs-7" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-navy" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted fs-7 mt-2">
                Loading your financial ledger...
              </p>
            </div>
          ) : filteredContributions.length === 0 ? (
            <div className="text-center py-5 border border-dashed rounded-4 bg-light">
              <i className="bi bi-folder2-open fs-1 text-muted opacity-50"></i>
              <h5 className="text-navy fw-bold mt-2">
                No {activeTab} contributions found
              </h5>
              <p className="text-muted fs-7 mb-3">
                You haven't submitted any {activeTab} payment receipts yet.
              </p>
              <Link
                to="/SubmitContribution"
                className="btn btn-navy-gold btn-sm px-4 fw-semibold"
              >
                Submit New Contribution
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-navy fs-7 uppercase">
                  <tr>
                    <th>Amount (ETB)</th>
                    <th>Payment Date</th>
                    <th>CBE Reference</th>
                    <th>Due Date Window</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="fs-7">
                  {filteredContributions.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold text-navy">
                        ETB {Number(item.amount).toFixed(2)}
                      </td>
                      <td>
                        {new Date(item.payment_date).toLocaleDateString()}
                      </td>
                      <td>
                        <span className="font-monospace text-secondary">
                          {item.transaction_reference}
                        </span>
                      </td>
                      <td>
                        {Number(item.is_on_time) === 1 ||
                        item.is_on_time === true ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 rounded-pill fw-semibold fs-8">
                            <i className="bi bi-clock-check-fill me-1"></i>{" "}
                            On-Time 
                          </span>
                        ) : (
                          <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 rounded-pill fw-semibold fs-8">
                            <i className="bi bi-clock-history me-1"></i> Late
                            Submission
                          </span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "approved"
                              ? "bg-emerald text-white"
                              : item.status === "rejected"
                                ? "bg-danger text-white"
                                : "bg-secondary text-white"
                          } px-2.5 py-1 rounded-pill text-capitalize`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        {item.receipt_url ? (
                          <a
                            href={item.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary px-2 py-1 fs-8"
                          >
                            <i className="bi bi-eye"></i>
                          </a>
                        ) : (
                          <span className="text-muted fs-8">
                            No receipt link
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}

export default MemberDashboard;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./AdminDashboard.css";
import AuthFooter from "../../Layouts/AuthLayouts/AuthFooter/AuthFooter";

function AdminDashboard() {
  const [adminUser, setAdminUser] = useState({ name: "Admin", email: "" });
  const [contributions, setContributions] = useState([]);
  const [activeTab, setActiveTab] = useState("monthly"); // Tab state: 'monthly' or 'yearly'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [auditNotes, setAuditNotes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAdminUser(parsedUser);
    }

    fetchAllContributions(token);
  }, [navigate]);

  const fetchAllContributions = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/contributions/admin/all",
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
        throw new Error(data.message || "Failed to fetch audit queue.");
      }

      setContributions(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuditAction = async (id, status) => {
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    const notes = auditNotes[id] || "";

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/contributions/admin/audit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status, auditNotes: notes }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to audit contribution.");
      }

      setSuccess(`Contribution successfully ${status}!`);
      fetchAllContributions(token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filter contributions by active tab
  const filteredContributions = contributions.filter((c) => {
    const type = c.payment_type || "monthly";
    return type === activeTab;
  });

  return (
    <div className="admin-dashboard-page min-vh-100 d-flex flex-column">
      {/* Top Navigation Bar */}
      <nav className="sticky-top dashboard-navbar navbar navbar-expand bg-white border-bottom px-4 py-3 shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-extrabold text-navy fs-4 tracking-wide">
            GGI{" "}
            <span className="text-gold fw-normal fs-6">
              Admin Audit Console
            </span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <span className="d-block fw-bold text-navy fs-7">
                {adminUser.name}
              </span>
              <span className="d-block text-emerald fs-8 fw-semibold">
                Executive Committee
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link
                to="/MemberDashboard"
                className="btn btn-outline-navy btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-1 text-decoration-none"
              >
                <i className="bi bi-person-badge"></i>
                <span>Member Portal</span>
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold d-flex align-items-center gap-1"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container my-4 flex-grow-1">
        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100 bg-navy text-white d-flex flex-column justify-content-center">
              <span className="badge bg-gold text-navy px-3 py-1 rounded-pill fw-bold fs-8 mb-2 align-self-start">
                AUDIT MANAGEMENT GATEWAY
              </span>
              <h2 className="fw-bold mb-2 text-white">
                Executive Verification Queue
              </h2>
              <p className="text-light opacity-75 fs-7 mb-0">
                Review member CBE contribution receipts, verify transaction
                references, and issue official audit approvals.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100 bg-white border-start border-4 border-gold d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-megaphone-fill text-gold fs-5"></i>
                  <h5 className="fw-bold text-navy mb-0">Broadcast Center</h5>
                </div>
                <p className="text-muted fs-8 mb-3">
                  Publish institutional rate guidelines, coordinate assembly
                  notices, and broadcast active meeting links.
                </p>
                <ul className="bullet-guidelines-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>
                      Pin active monthly or yearly contribution rates.
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Attach valid Google Meet or Zoom links.</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/AnnouncementManager"
                className="btn-emerald text-white fw-bold rounded-pill px-3 py-2 shadow-sm w-100 mt-2 d-flex align-items-center justify-content-center gap-2 text-decoration-none"
              >
                <span>Manage Broadcast Center</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
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

        {/* Audit Table Section */}
        <div className="audit-section bg-white p-4 rounded-4 shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-3">
            <div>
              <h4 className="text-navy fw-bold mb-1">All Member Submissions</h4>
              <p className="text-muted fs-7 mb-0">
                Manage pending, approved, and rejected financial records.
              </p>
            </div>
            <span className="badge bg-navy text-gold px-3 py-2 fs-7 rounded-pill">
              Total Records: {filteredContributions.length}
            </span>
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
                <i className="bi bi-calendar-month me-1"></i> Monthly Queue
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
                Queue
              </button>
            </li>
          </ul>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-navy" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted fs-7 mt-2">
                Loading institution audit records...
              </p>
            </div>
          ) : filteredContributions.length === 0 ? (
            <div className="text-center py-5 border border-dashed rounded-4 bg-light">
              <i className="bi bi-inbox fs-1 text-muted opacity-50"></i>
              <h5 className="text-navy fw-bold mt-2">
                {activeTab === "monthly" ? "Monthly" : "Yearly"} Audit Queue is
                Empty
              </h5>
              <p className="text-muted fs-7 mb-0">
                No {activeTab} contribution submissions found in this category.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-navy fs-7 uppercase">
                  <tr>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>CBE Reference</th>
                    <th>Window</th>
                    <th>Status</th>
                    <th>Audit Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="fs-7">
                  {filteredContributions.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <span className="fw-bold text-navy d-block">
                          {item.member_name}
                        </span>
                        <span className="text-muted fs-8">
                          {item.member_email}
                        </span>
                      </td>
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
                        <span
                          className={`badge ${
                            item.is_on_time
                              ? "bg-success-subtle text-success"
                              : "bg-warning-subtle text-warning"
                          } px-2.5 py-1 rounded-pill`}
                        >
                          {item.is_on_time ? "On-Time" : "Late"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "approved"
                              ? "bg-emerald text-white"
                              : item.status === "rejected"
                                ? "bg-danger text-white"
                                : "bg-warning text-dark"
                          } px-2.5 py-1 rounded-pill text-capitalize`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm fs-8 custom-input-note"
                          placeholder="Add comment..."
                          value={auditNotes[item.id] || item.audit_notes || ""}
                          onChange={(e) =>
                            setAuditNotes({
                              ...auditNotes,
                              [item.id]: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            onClick={() =>
                              handleAuditAction(item.id, "approved")
                            }
                            className="btn btn-sm btn-success px-2 py-1 fs-8"
                            title="Approve Contribution"
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                          <button
                            onClick={() =>
                              handleAuditAction(item.id, "rejected")
                            }
                            className="btn btn-sm btn-danger px-2 py-1 fs-8"
                            title="Reject Contribution"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                          {item.receipt_url && (
                            <a
                              href={item.receipt_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary px-2 py-1 fs-8"
                              title="View Receipt"
                            >
                              <i className="bi bi-eye"></i>
                            </a>
                          )}
                        </div>
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

export default AdminDashboard;

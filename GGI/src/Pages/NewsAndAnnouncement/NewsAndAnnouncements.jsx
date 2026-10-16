import React, { useState, useEffect, useCallback } from "react";
import "./NewsAndAnnouncement.css";

function NewsAndAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/v1/announcements");
      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to load announcements.");

      setAnnouncements(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const getCategoryBadge = (category) => {
    switch (category) {
      case "monthly_rate":
        return <span className="badge bg-green">Monthly Rate</span>;
      case "yearly_rate":
        return <span className="badge bg-green">Yearly Rate</span>;
      case "committee_meeting":
        return <span className="badge bg-nevy">Committee Meeting</span>;
      case "general_meeting":
        return <span className="badge bg-nevy">General Assembly</span>;
      default:
        return (
          <span className="badge bg-secondary text-white">
            General Announcement
          </span>
        );
    }
  };

  return (
    <div className="news-page min-vh-100 d-flex flex-column">
      {/* Main Container */}
      <div className="container py-5 flex-grow-1">
        {/* Page Title */}
        <div className="mb-4 text-center">
          <span className="headnew px-3 py-1 rounded-pill fw-bold fs-8">
            GOAL GATE INSTITUTION
          </span>
          <h2 className="fw-bold text-navy">News, Payment Rates & Meetings</h2>
          <p className="text-muted fs-7">
            Stay updated with official institutional rate guidelines, assembly
            notices, and meeting schedules.
          </p>
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-navy" role="status"></div>
            <p className="text-muted mt-2 fs-7">Loading bulletin board...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2 fs-7 mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && announcements.length === 0 && (
          <div className="card text-center py-5 border-0 shadow-sm rounded-4">
            <i className="bi bi-newspaper fs-1 text-muted mb-2"></i>
            <h5 className="fw-bold text-navy">No Announcements Posted Yet</h5>
            <p className="text-muted fs-7">
              Check back later for updates from the Executive Committee.
            </p>
          </div>
        )}

        {/* Announcements Grid: stacked on small screens, 2 per row on large screens */}
        {!loading && announcements.length > 0 && (
          <div className="row g-3">
            {announcements.map((item) => (
              <div key={item.id} className="col-12 col-lg-6">
                <div
                  className={`newse card h-100 d-flex flex-column shadow-sm rounded-4 p-4 ${
                    item.is_pinned
                      ? "border-start border-2 bordergold bglight-gold"
                      : "border-0 bg-white"
                  }`}
                >
                  {/* Card Header */}
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="d-flex align-items-center flex-wrap gap-2 mb-1">
                        {getCategoryBadge(item.category)}
                        {Boolean(item.is_pinned) && (
                          <span className="badge bg-gold text-navy fw-bold">
                            <i className="bi bi-pin-angle-fill me-1"></i> Pinned
                            Notice
                          </span>
                        )}
                      </div>
                      <h4 className="fw-bold text-navy mb-0 fs-5">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Content Body */}
                  <p
                    className="text-dark fs-7 mb-3 flex-grow-1"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {item.content}
                  </p>

                  {/* Card Footer */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top mt-auto">
                    <span className="text-muted fs-8">
                      Posted by{" "}
                      <strong>
                        {item.author_name || "Executive Committee"}
                      </strong>{" "}
                      on {new Date(item.created_at).toLocaleDateString()}
                    </span>

                    {/* Active Meeting Link Button */}
                    {item.meeting_link && (
                      <a
                        href={item.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-navy text-gold fw-bold rounded-pill px-3 shadow-sm d-inline-flex align-items-center gap-1"
                      >
                        <i className="bi bi-camera-video-fill"></i> Join Meeting
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsAndAnnouncements;

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AnnouncementManager from "../../Components/AnnouncementManager/AnnouncementManager";

import "./NewsAndAnnouncement.css";

function NewsAndAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingNotice, setEditingNotice] = useState(null);

  // Read user role from token or localStorage
  const userRole = localStorage.getItem("role") || "member";
  const isAdmin = userRole === "admin";

const fetchAnnouncements = useCallback(async () => {
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/v1/announcements"); // No token needed!
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/v1/announcements/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchAnnouncements();
      } else {
        alert("Failed to delete announcement.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "monthly_rate":
        return <span className="badge ">Monthly Rate</span>;
      case "yearly_rate":
        return <span className="badge bg-info text-dark">Yearly Rate</span>;
      case "committee_meeting":
        return <span className="badge bg-purple text-white">Committee Meeting</span>;
      case "general_meeting":
        return <span className="badge bg-success text-white">General Assembly</span>;
      default:
        return <span className="badge bg-secondary text-white">General Announcement</span>;
    }
  };

  return (
    <div className="news-page min-vh-100 d-flex flex-column">
      


      {/* Main Container */}
      <div className="container py-5 flex-grow-1">
        
        {/* Page Title */}
        <div className="mb-4 text-center">
          <span className="badge bg-gold text-navy px-3 py-1 rounded-pill fw-bold fs-8 mb-2">
            GOAL GATE INSTITUTION
          </span>
          <h2 className="fw-bold text-navy">News, Payment Rates & Meetings</h2>
          <p className="text-muted fs-7">
            Stay updated with official institutional rate guidelines, assembly notices, and meeting schedules.
          </p>
        </div>

        {/* Admin Form Section (Visible only to Admin) */}
        {isAdmin && (
          <AnnouncementManager
            onAnnouncementSaved={fetchAnnouncements}
            editingNotice={editingNotice}
            setEditingNotice={setEditingNotice}
          />
        )}

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-navy" role="status"></div>
            <p className="text-muted mt-2 fs-7">Loading bulletin board...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2 fs-7 mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        {/* Announcements List */}
        {!loading && announcements.length === 0 && (
          <div className="card text-center py-5 border-0 shadow-sm rounded-4">
            <i className="bi bi-newspaper fs-1 text-muted mb-2"></i>
            <h5 className="fw-bold text-navy">No Announcements Posted Yet</h5>
            <p className="text-muted fs-7">Check back later for updates from the Executive Committee.</p>
          </div>
        )}

        {!loading && announcements.length > 0 && (
          <div className="row g-3">
            {announcements.map((item) => (
              <div key={item.id} className="col-12">
                <div
                  className={`card border-0 shadow-sm rounded-4 p-4 ${
                    item.is_pinned ? "border-start border-4 border-gold bg-light-gold" : "bg-white"
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        {getCategoryBadge(item.category)}
                        {Boolean(item.is_pinned) && (
                          <span className="badge bg-gold text-navy fw-bold">
                            <i className="bi bi-pin-angle-fill me-1"></i> Pinned Notice
                          </span>
                        )}
                      </div>
                      <h4 className="fw-bold text-navy mb-0 fs-5">{item.title}</h4>
               </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          onClick={() => setEditingNotice(item)}
                          title="Edit Announcement"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          onClick={() => handleDelete(item.id)}
                          title="Delete Announcement"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <p className="text-dark fs-7 mb-3 style-pre-wrap">{item.content}</p>

                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pt-2 border-top">
                    <span className="text-muted fs-8">
                      Posted by <strong>{item.author_name || "Executive Committee"}</strong> on{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>

                    {/* Meeting Link Button */}
                    {item.meet_link && (
                      <a
                        href={item.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-emerald btn-sm text-white fw-bold rounded-pill px-3"
                      >
                        <i className="bi bi-camera-video-fill me-1"></i> Join Meeting
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
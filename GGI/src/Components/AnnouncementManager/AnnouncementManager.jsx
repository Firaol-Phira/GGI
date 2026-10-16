import React, { useState, useEffect, useCallback } from "react";
import "./AnnouncementManager.css";

function AnnouncementManager({ onAnnouncementSaved }) {
  // Local state for tracking which announcement is being edited
  const [editingNotice, setEditingNotice] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    content: "",
    meet_link: "",
    target_role: "all",
    is_pinned: false,
  });

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all announcements for admin management
  const fetchAnnouncements = useCallback(async () => {
    setListLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/announcements");
      const data = await res.json();
      if (res.ok) {
        setAnnouncements(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load list:", err);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Sync form inputs whenever an item is selected for editing
  useEffect(() => {
    if (editingNotice) {
      setFormData({
        title: editingNotice.title || "",
        category: editingNotice.category || "general",
        content: editingNotice.content || "",
        meet_link: editingNotice.meet_link || editingNotice.meeting_link || "",
        target_role: editingNotice.target_role || "all",
        is_pinned: Boolean(editingNotice.is_pinned),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [editingNotice]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "general",
      content: "",
      meet_link: "",
      target_role: "all",
      is_pinned: false,
    });
    setEditingNotice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    const isEdit = Boolean(editingNotice);
    const url = isEdit
      ? `http://localhost:5000/api/v1/announcements/${editingNotice.id}`
      : "http://localhost:5000/api/v1/announcements";

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Operation failed.");

      setMessage(
        isEdit ? "Announcement updated successfully!" : "Announcement posted!",
      );
      handleReset();
      fetchAnnouncements();
      if (onAnnouncementSaved) onAnnouncementSaved();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:5000/api/v1/announcements/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        setMessage("Announcement deleted successfully!");
        fetchAnnouncements();
        if (onAnnouncementSaved) onAnnouncementSaved();
      } else {
        alert("Failed to delete announcement.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Form Card */}
      <div className="card shadow-sm border-0 rounded-4 p-4 mb-4 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-navy mb-0">
            <i className="bi bi-megaphone-fill text-gold me-2"></i>
            {editingNotice
              ? "Edit Announcement / Rates"
              : "Publish New Announcement / Rates"}
          </h5>
          {editingNotice && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm rounded-pill"
              onClick={handleReset}
            >
              Cancel Edit
            </button>
          )}
        </div>

        {message && (
          <div
            className={`alert ${
              message.startsWith("Error") ? "alert-danger" : "alert-success"
            } py-2 fs-7 mb-3`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Title */}
            <div className="col-md-8">
              <label className="form-label fw-bold text-navy fs-7">
                Title / Headline *
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Payment Rate Update or  Meeting"
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-4">
              <label className="form-label fw-bold text-navy fs-7">
                Category *
              </label>
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="general">General News</option>
                <option value="monthly_rate">Monthly Payment Rate</option>
                <option value="yearly_rate">Yearly Payment Rate</option>
                <option value="committee_meeting">Committee Meeting</option>
                <option value="general_meeting">
                  General Assembly Meeting
                </option>
              </select>
            </div>

            {/* Content */}
            <div className="col-12">
              <label className="form-label fw-bold text-navy fs-7">
                Content / Announcement Details *
              </label>
              <textarea
                className="form-control"
                name="content"
                rows="3"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter complete details."
                required
              ></textarea>
            </div>

            {/* Meeting Link */}
            <div className="col-md-6">
              <label className="form-label fw-bold text-navy fs-7">
                Meeting URL (Google Meet / Zoom)
              </label>
              <input
                type="url"
                className="form-control"
                name="meet_link"
                value={formData.meet_link}
                onChange={handleChange}
                placeholder="https://meet.google.com/xyz-abc-def"
              />
            </div>

            {/* Audience Target */}
            <div className="col-md-3">
              <label className="form-label fw-bold text-navy fs-7">
                Target Audience
              </label>
              <select
                className="form-select"
                name="target_role"
                value={formData.target_role}
                onChange={handleChange}
              >
                <option value="all">All Members & Committee</option>
                <option value="committee">Executive Committee Only</option>
                <option value="members">General Members Only</option>
              </select>
            </div>

            {/* Pin Checkbox */}
            <div className="col-md-3 d-flex align-items-end">
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_pinned"
                  name="is_pinned"
                  checked={formData.is_pinned}
                  onChange={handleChange}
                />
                <label
                  className="form-check-label fw-bold text-navy fs-7"
                  htmlFor="is_pinned"
                >
                  Pin to Top of Board
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-12 mt-3">
              <button
                type="submit"
                disabled={loading}
                className=" btn-emerald text-white fw-bold rounded-pill px-4 py-2"
              >
                {loading
                  ? "Saving..."
                  : editingNotice
                    ? "Update Notice"
                    : "Publish Notice"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Admin Announcement Management Table / List Section */}
      <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
        <h5 className="fw-bold text-navy mb-3">
          <i className="bi bi-list-task text-gold me-2"></i>
          Manage Existing Announcements & Rates
        </h5>

        {listLoading ? (
          <div className="text-center py-4">
            <div
              className="spinner-border spinner-border-sm text-navy"
              role="status"
            ></div>
            <span className="text-muted ms-2 fs-7">Loading records...</span>
          </div>
        ) : announcements.length === 0 ? (
          <p className="text-muted fs-7 mb-0">No announcements recorded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle fs-8">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Target</th>
                  <th>Date</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold text-navy">
                      {item.title}
                      {Boolean(item.is_pinned) && (
                        <span className="badge bg-gold text-navy ms-2 fs-9">
                          Pinned
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-secondary text-white">
                        {item.category}
                      </span>
                    </td>
                    <td className="text-capitalize">{item.target_role}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary rounded-pill px-3"
                          onClick={() => setEditingNotice(item)}
                        >
                          <i className="bi bi-pencil-fill me-1"></i> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash-fill me-1"></i> Delete
                        </button>
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
  );
}

export default AnnouncementManager;

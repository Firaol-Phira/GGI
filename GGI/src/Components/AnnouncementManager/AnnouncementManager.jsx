import React, { useState, useEffect } from "react";
import "./AnnouncementManager.css";  

function AnnouncementManager({
  onAnnouncementSaved,
  editingNotice,
  setEditingNotice,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    content: "",
    meet_link: "",
    target_role: "all",
    is_pinned: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingNotice) {
      setFormData({
        title: editingNotice.title || "",
        category: editingNotice.category || "general",
        content: editingNotice.content || "",
        meet_link: editingNotice.meet_link || "",
        target_role: editingNotice.target_role || "all",
        is_pinned: Boolean(editingNotice.is_pinned),
      });
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
    if (setEditingNotice) setEditingNotice(null);
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
      if (onAnnouncementSaved) onAnnouncementSaved();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
            className="btn btn-outline-secondary btn-sm rounded-pill"
            onClick={handleReset}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {message && (
        <div
          className={`alert ${message.startsWith("Error") ? "alert-danger" : "alert-success"} py-2 fs-7 mb-3`}
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
              placeholder="e.g. Monthly Payment Rate Update or Assembly Meeting"
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
              <option value="general_meeting">General Assembly Meeting</option>
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
              placeholder="Enter complete details, payment amounts, deadlines, or meeting agenda..."
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
  );
}

export default AnnouncementManager;
